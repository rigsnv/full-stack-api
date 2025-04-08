import requests
import json
import os
from datetime import datetime, timezone

class PCSClient:
    def __init__(self):
        self.date_from = ""
        self.notice_type = "3"
        self.output_type = "0"
        self.url = 'https://api.publiccontractsscotland.gov.uk/v1/Notices'
        self.headers = {
            'User-Agent': 'PCS_API_Interface_Proof_of_Concept/1.0 (rigsnv@gamil.com, james@jmautomations.scot)'
            } # REQUIRED
        self.params = {
            'noticeType': self.notice_type,
            'outputType': self.output_type
        }
        self.res = None
        self.data = None
        self.timestamp = None
        self.pcs_contracts_filename = None
        self.data_store = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data_store/pcs_contracts"))
        self.log_file_path = os.path.join(self.data_store, "file_creation_log.txt")


    def get_pcs_contracts(self, date_from=None, notice_type=None, output_type=None):
        print("PCSClient: get_pcs_contracts() called")
        if date_from:
            self.params['dateFrom'] = date_from
        if notice_type:
            self.params['noticeType'] = notice_type
        if output_type:
            self.params['outputType'] = output_type
              
        try:
            self.res = requests.get(self.url, headers=self.headers, params=self.params)
            self.res.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
            self.data = self.res.json()
            self.timestamp = datetime.now(timezone.utc).strftime('%Y-%m-%d-%H%M%S')
            self.pcs_contracts_filename = f'pcs_contracts_{self.timestamp}.json'  # Append timestamp to the pcs_contracts_filename
            self.save_response_to_file()  # Save response to a file
            self.log_file_creation()  # Log the file creation
        
        except requests.HTTPError as e:
            raise ValueError(f"HTTP error occurred: {e}")
        except requests.RequestException as e:
            raise ValueError(f"Request error occurred: {e}")
        except json.JSONDecodeError:
            raise ValueError("Invalid JSON response")
        except Exception as e:
            raise ValueError(f"An error occurred: {e}")
        return self.data

    def get_archived_pcs_contracts(self):
        print("PCSClient: get_archived_pcs_contracts() called")
        with open(self.log_file_path, 'r') as log_file:
            lines = log_file.readlines()
            if lines:
                last_line = lines[-1]
                self.pcs_contracts_file_path = last_line.split(' ')[-1].strip()
                print(f"File path: {self.pcs_contracts_file_path}")
                with open(self.pcs_contracts_file_path, 'r') as file:
                    self.data = json.load(file)
                    print(f"Data loaded from {self.pcs_contracts_file_path}")
        return self.data

    def save_response_to_file(self):
        try:
            self.pcs_contracts_file_path = os.path.join(self.data_store, self.pcs_contracts_filename)
            print(self.pcs_contracts_file_path)
            with open(self.pcs_contracts_file_path, 'w') as file:
                json.dump(self.data, file, indent=4)  # Save JSON data with indentation for readability
            print(f"Response saved to {self.pcs_contracts_filename} in ../../client/public")
        except Exception as e:
            print(f"Error saving response to file: {str(e)}")

    def log_file_creation(self):
        try:
            # Append the log entry
            with open(self.log_file_path, 'a') as log_file:
                log_entry = f"{datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} - {self.pcs_contracts_filename} - {self.pcs_contracts_file_path}\n"
                log_file.write(log_entry)
            print(f"Log entry added for {self.pcs_contracts_filename}")
        except Exception as e:
            print(f"Error logging file creation: {str(e)}")


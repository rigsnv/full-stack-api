import requests
import time
import os
import json

"""
======================
Author: Ricardo Garcia
Date: 2023-03-28
Version: 1.0
======================
Met Office API Client
======================
License: MIT
License: Apache-2.0
======================
Description:
This is a Python module that provides a client for the Met Office API.
The base URL is set to retrieve site-specific forecast by default.
The based URL can be changed to retrieve other types of data, such as geospatial data.
Visit https://www.metoffice.gov.uk/services/data/datapoint/api for more information.
======================
Notes:
The code is designed to be used as a module and can be imported into other Python scripts.
To set up the API client, create an instance of the MetOfficeClient class and set the required parameters.
Call the retrieveForecast() method after setting the parameters to retrieve the forecast data.
======================
"""

class MetOfficeClient:
    def __init__(self):
        """Initialize the Met Office API client with default parameters."""
        # Default base URL: Retrive site-specific forecast for a single location
        self.baseUrl = "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/"
        # Frequency of the timesteps provided in the forecast.
        # The options are hourly, three-hourly or daily"
        self.timesteps = "hourly" # Default timestep: hourly
        #Boolean value for whether parameter metadata should be excluded
        self.excludeMetadata = "FALSE"
        #REQUIRED: Provide the latitude of the location you wish to retrieve the forecast for
        self.latitude = ""
        #REQUIRED: Provide the longitude of the location you wish to retrieve the forecast for
        self.longitude = ""
        #REQUIRED: Your WDH API Credentials
        self.apikey = ""
        #Boolean value for whether the location name should be included
        self.includeLocation = "TRUE"
        # Set up the request headers
        self.headers = {'accept': "application/json"}
        # Get the path to the API key file
        self.filepath = os.path.join(os.path.dirname(__file__), '../secret/met_office_api_key.json')
        
    def retrieveForecast(self):
        # Validate latitude and longitude
        if not self.latitude or not self.longitude:
            raise ValueError("ERROR: Latitude and longitude must be supplied")

        # Validate timesteps
        if self.timesteps not in ["hourly", "three-hourly", "daily"]:
            raise ValueError("ERROR: The available frequencies for timesteps are hourly, three-hourly or daily.")

        # Load API key from environment variable
        self.apikey = os.getenv('MET_OFFICE_API_KEY')
        if not self.apikey:
            raise ValueError("ERROR: The MET_OFFICE_API_KEY environment variable is not set.")

        # Call the Met Office API to retrieve the forecast data
        self.url = self.baseUrl + self.timesteps
        self.headers.update({"apikey": self.apikey})
        self.params = {
            'excludeParameterMetadata': self.excludeMetadata,
            'includeLocationName': self.includeLocation,
            'latitude': self.latitude,
            'longitude': self.longitude
        }

        retries = 3
        for attempt in range(retries):
            try:
                res = requests.get(url=self.url, headers=self.headers, params=self.params)
                res.raise_for_status()
                data = res.json()  # Ensure the response is valid JSON
                if 'error' in data:
                    raise ValueError(f"ERROR: {data['error']}")
                return data
            except requests.exceptions.RequestException as e:
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    raise RuntimeError("ERROR: Failed to retrieve forecast after multiple attempts.")
            except ValueError as e:
                raise
            except Exception as e:
                raise
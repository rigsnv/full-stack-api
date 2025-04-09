# Full-stack API

## Overview

Full-stack-api is a my first full-stack web application. The current implementation provides weather forecasts and manages a database of public tender contracts. It features a **React-based frontend** and a **FastAPI backend** to work with external APIs from different providers.

My goal with this projects is create web application for data analysis and modelling by gathering data from various sources, processing it, and making it available to consume via a versatile and visually appealing User Interface (UI).

## Languages

### Python
I chose Python because it's one of the most vastly used languages for data analysis, Large Language Models (LLM) implementations and scientific research in general, because of it's compact syntax and the great number of powerful libraries it has for these purposes, some of which I will be implementing in this project in the near future.

### Javascript
I chose Javascript with **HTML/CSS** because of its great versatility when building browser-based **UI**s. They give me the freedom to create custom UIs that are dynamic, fast, intuitive and visually appealing.

## Frameworks
After conducting some research and trying out different frameworks I chose React and FastAPI for the same reasons I chose the languages they are built on (you see the recurrent theme here):

- Widely used (which means great support).
- Powerful capabilities.
- Relative ease of implementation.
- Great versatility.

With the latter being a very important factor when building custom systems as the one I am planning to build.  

## Features
The current implementation features:

- **Weather Forecasts**: Retrieve weather data from the **Met Office** based on location and time steps (hourly, three-hourly, or daily).
  - The location is retrieved form the web-browser by the UI at the front end and sent to fastAPI server running at the back end via a PUT request.
  - The fastAPI server processes the request from the front end and uses a custom client to communicated with the Met Offices API. It retrieves, stores and serves the data to the front end
  - The UI processes the data received from the back end and displays the forecast in hourly tables.

- **PCS Contracts Management**:
  - View live PCS contracts.
  - Access archived PCS contracts.
  - Render JSON data as collapsible trees for easy navigation.

- **Frontend**: Built with React and Vite for a fast and responsive user experience.
- **Backend**: Powered by FastAPI for robust and scalable API endpoints.

## Project Structure
awesome-project/ ├── client/ # Frontend code │ ├── public/ # Static assets (JSON files, logs, etc.) │ ├── src/ # React components and styles │ ├── package.json # Frontend dependencies │ └── vite.config.js # Vite configuration ├── server/ # Backend code │ ├── main.py # FastAPI application │ ├── utils/ # Utility modules (e.g., PCSClient, MetOfficeClient) │ └── requirements.txt # Backend dependencies └── readme.md # Project documentation

## Prerequisites
- **Frontend**:
  - Node.js (v16 or later)
  - npm or yarn
- **Backend**:
  - Python 3.9 or later
  - pip

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/rigsnv/full-stack-api.git
cd full-stack-api
```
### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

- Open your browser and navigate to http://localhost:5173.

### 3. Backend Setup

### IMPOIRTANT

The Met Office's API requires an API key. You must register with the Met Office in order to get your own API key.
Once you get your api key, you need to create a json file named "met_office_api_key.json" and place it inside the ./server/secret directory, as the "met_office_client" looks for that file to get the key and call the Met Office's API. if the file is missing, you will bet an CORS error.

Go to: https://login.auth.metoffice.cloud/dce84ec6-ce0f-45d1-ba16-e36b817081eb/oauth2/v2.0/authorize?response_type=code&client_id=56081e5c-48a6-47f2-a7c4-b8f8cf8172a6&scope=56081e5c-48a6-47f2-a7c4-b8f8cf8172a6%20openid%20offline_access&state=LZV5h5fFkIozOytqDfKXFKIwPxbr7ENBNe6owHeI_iM%3D&redirect_uri=https://datahub.metoffice.gov.uk/login/oauth2/code/&nonce=mi68P0idXnXww5sFopWKwHgUG-oQEZdUJEWovQuiejo&p=b2c_1a_victory_susi&x-client-SKU=spring-boot-starter

Select "Register" and follow the steps above for the above to make the key available to e the "met_office_client"

The Public Contracts Scotland's API (PCS) doesnt require a key, so it will work without the need to add any files.

1. Open a new Terminal and navigate to the project's root directory (full-stack-api).
2. Run the following commands which will:
    1. Navigate to the server directory of the project.
    2. Create a new Python Virtual Environment
    3. Activate the virtual environment.
    4. Upgrade pip (recommended).
    5. Install the server's dependencies in your newly created virtual environment.
    6. Start the server.

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
fastapi dev main.py
```

- The backend will run at http://127.0.0.1:8000.

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://127.0.0.1:8000

Fast API comes with Swager, which will automatically run  at:

- http://127.0.0.1:8000/docs (Swagger UI)

You can run tests sending HTTP requests to the backend fastAPI server using the Swagger UI that comes with fast API and it's preconfigured to run at that endpoint.

## API Endpoints

### Weather
- PUT /weather: Update weather data based on location and time steps.

### PCS Contracts
- GET /pcs_contracts: Retrieve live PCS contracts.
- GET /pcs_contracts/archived: Retrieve archived PCS contracts.

## Frontend Components
- App.jsx: Main application component.
- Navbar.jsx: Navigation bar for switching between pages.
- Contract.jsx: Renders JSON data as a collapsible tree.
- Test.jsx: Demonstrates rendering of JSON data.

## Backend Utilities
- MetOfficeClient: Handles weather data retrieval.
- PCSClient: Manages PCS contracts (live and archived).

## File Logs
- JSON files are stored in client/public/ and logged in file_creation_log.txt.

### IMPOIRTANT

For development you should add stricks mode in the main.jsx module (./client/src/main.jsx), as in the script below.

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## Future Enhancements
- Implement advanced filtering for PCS contracts.
- Improve UI/UX for JSON tree rendering.
- Add user authentication.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
Ricardo E. Garcia Cerrada

## Acknowledgments
- React
- FastAPI
- Vite

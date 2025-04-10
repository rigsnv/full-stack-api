from fastapi import FastAPI, Body
from pydantic import BaseModel
from .utils.met_office_client import MetOfficeClient
from .utils.pcs_client import PCSClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1/5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return{"message": "Hello World of Fast APIs!"}

class Params(BaseModel):
    latitude: float
    longitude: float
    timesteps: str = "hourly"

@app.put("/weather")
def update_weather(params: Params = Body(...)):
    client = MetOfficeClient()
    client.latitude = params.latitude 
    client.longitude = params.longitude
    timesteps = params.timesteps
    if timesteps not in ["hourly", "three-hourly", "daily"]:
        pass
    else:
        client.timesteps = timesteps
    return client.retrieveForecast()  # Await the async method

@app.get("/pcs_contracts")
def update_contracts():
    client = PCSClient()
    return client.get_pcs_contracts()

@app.get("/pcs_contracts/archived")
def get_contracts():
    client = PCSClient()
    return client.get_archived_pcs_contracts()

@app.get("/pcs_contracts/live/{date_from}/{notice_type}/{output_type}")
def update_contracts(date_from=None, notice_type=3, output_type=0):
    client = PCSClient()
    return client.get_pcs_contracts(date_from=date_from, notice_type=notice_type, output_type=output_type)

from fastapi import FastAPI, Body, Request
from pydantic import BaseModel
from .utils.met_office_client import MetOfficeClient
from .utils.pcs_client import PCSClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI()

origins = [
    "https://ricardogarcia.uk",
    "https://ricardogarcia.uk/",
    "https://ricardogarcia.uk/weather",
    "https://ricardogarcia.uk/pcs_contracts",
    "https://217.160.0.207",
    "https://rigsnv-ejfqade8hydkh3c8.uksouth-01.azurewebsites.net/",
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

@app.middleware("http")
async def referer_and_path_middleware(request: Request, call_next):
    # Check the Referer header
    referer = request.headers.get("referer")
    allowed_referer = "https://ricardogarcia.uk"

    # Check the request path
    allowed_paths = ["/weather", "/pcs_contracts"]

    if referer and referer.startswith(allowed_referer) and request.url.path in allowed_paths:
        response = await call_next(request)
        return response

    return JSONResponse(status_code=403, content={"detail": "Forbidden: Invalid referer or path"})

@app.get("/")
async def root():
    return{"message": "Hello World of Fast APIs on Azure!"}

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

#test, this should trigger a build

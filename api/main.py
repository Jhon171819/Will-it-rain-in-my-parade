from fastapi import FastAPI
from services.nominatim.NominatimService import NominatimService

app = FastAPI()

@app.get("/dashboard")
def get_dashboard():
    dashboard_data = {
        "location_card": NominatimService.LocationData("-7.8725687", "-77.3607387"),
    }
    return dashboard_data

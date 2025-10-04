import json
from services.nominatim.NominatimService import NominatimService

def handler(request, response):
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        response.status_code = 400
        response.json({"error": "'lat' and 'lon' parameters are required"})
        return

    try:
        address = NominatimService.LocationData(lat, lon)
        response.status_code = 200
        response.json({"data": address})
    except Exception as e:
        response.status_code = 500
        response.json({"error": str(e)})

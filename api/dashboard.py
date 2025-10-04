from services.nominatim.NominatimService import NominatimService

def handler(request, response):
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if not lat or not lon:
        response.status_code = 400
        return response.json({"error": "'lat' and 'lon' parameters are required"})

    try:
        address = NominatimService.LocationData(lat, lon)
        return response.json({"data": address})
    except Exception as e:
        response.status_code = 500
        return response.json({"error": str(e)})

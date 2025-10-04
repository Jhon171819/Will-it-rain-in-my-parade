from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
from services.nominatim.NominatimService import NominatimService


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        lat = query_params.get("lat", [None])[0]
        lon = query_params.get("lon", [None])[0]

        if not lat or not lon:
            self.send_response(400)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            message = {"error": "'lat' and 'lon' parameters are required"}
            self.wfile.write(json.dumps(message).encode())
            return

        try:
            address = NominatimService.LocationData(lat, lon)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"data": address}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

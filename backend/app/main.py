from services.nominatim.NominatimService import NominatimService

address = NominatimService.reverse_geocode("-3.7467414", "-38.5358611")

print(address)
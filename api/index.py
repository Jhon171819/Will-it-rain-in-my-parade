from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional
import os
import sys
import importlib

# Ensure project root is on sys.path so imports work when Vercel executes this
# file as a serverless function (it may run the file as a script which breaks
# leading-dot relative imports).
_here = os.path.dirname(__file__)  # path to api/
_project_root = os.path.dirname(_here)
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

# Try a few import strategies for robustness when deployed on Vercel.
NominatimService = None
for modname in (
    "api.services.nominatim.NominatimService",
    "services.nominatim.NominatimService",
    "nominatim.NominatimService",
):
    try:
        mod = importlib.import_module(modname)
        # module may expose class at module level
        NominatimService = getattr(mod, "NominatimService", None)
        if NominatimService:
            break
    except Exception:
        # ignore and try next
        continue

if NominatimService is None:
    # Last resort: try relative import (works when running as package)
    try:
        from .services.nominatim.NominatimService import NominatimService as _NS
        NominatimService = _NS
    except Exception as exc:
        raise RuntimeError(
            "Could not import NominatimService. Check imports and package layout." 
        ) from exc

app = FastAPI()


@app.get("/")
async def root():
    return {"ok": True, "message": "API root. Use /nominatim/reverse?lat=&lon="}


@app.get("/nominatim/reverse")
async def reverse(lat: Optional[float] = None, lon: Optional[float] = None):
    if lat is None or lon is None:
        raise HTTPException(status_code=400, detail="Missing 'lat' or 'lon' query parameters")

    try:
        result = NominatimService.LocationData(lat, lon)
        return JSONResponse(content=result)
    except Exception as exc:
        # Bubble up a readable error for debugging in logs
        raise HTTPException(status_code=500, detail=str(exc))

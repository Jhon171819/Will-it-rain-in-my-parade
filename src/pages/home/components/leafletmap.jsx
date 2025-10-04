import React, { useCallback, useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getPosition } from "../../../api/routes";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function LeafletMap(props) {
    const {actualPosition, setActualPosition} = props;
    console.log('Actual position in map:', actualPosition, setActualPosition);
    const [markedPosition, setMarkedPosition] = useState();

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);


    const geolocation = () => navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            return { lat: latitude, long: longitude };
        }
    );
    const handleMapClick = useCallback((e, map) => {
        const { lat, lng } = e.latlng;
            L.marker(markedPosition).remove();


        const response = getPosition({ lat, lon: lng }).then((response) => {
            setActualPosition(response);
            console.log('response: ',response)
        });

        setMarkedPosition([lat, lng]);
        L.marker([lat, lng]).addTo(map);

    }, [actualPosition, markedPosition]);

    useEffect(() => {
        if (!mapRef.current) return;
        if (mapInstanceRef.current) return;
        const map = L.map(mapRef.current).setView(geolocation() || [-3.7324727876304755, -38.508631859114914], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapInstanceRef.current = map;

        map.on('click', (e) => handleMapClick(e, map));

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);


    return <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}
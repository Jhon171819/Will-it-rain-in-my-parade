import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../../../api/api";

export function LeafletMap() {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    const geolocation = () => navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            return { lat: latitude, long: longitude };
        }
    );
    const handleMapClick = (e, map) => {
        const { lat, lng } = e.latlng;
        api.get('dashboard', { lat, lon: lng })
        L.marker([lat, lng]).addTo(map);

    }

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
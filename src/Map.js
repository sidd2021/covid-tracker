import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import ShowDataOnMap from "./ShowDataOnMap";
function Map({ countries, casesType, center, zoom }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ShowDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;

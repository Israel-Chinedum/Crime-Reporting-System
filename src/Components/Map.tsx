import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export const Map = ({
  stations,
  userLocation,
}: {
  stations: any[];
  userLocation: { lat: number; lng: number };
}) => {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Tooltip permanent>You</Tooltip>
        <Popup>Your location</Popup>
      </Marker>

      {stations.map((station) => (
        <div key={station.name}>
          <Marker position={[station.lat, station.lng]}>
            <Tooltip permanent>Security Station</Tooltip>
            <Popup>{station.name}</Popup>
          </Marker>

          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],
              [station.lat, station.lng],
            ]}
            pathOptions={{
              color: "red",
              weight: 4,
              dashArray: "10 10",
            }}
          />
        </div>
      ))}
    </MapContainer>
  );
};

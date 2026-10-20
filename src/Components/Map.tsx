import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { Fragment } from "react";

import "leaflet/dist/leaflet.css";

type Station = {
  name: string;
  lat: number;
  lng: number;
  distance: number;
};

type MapProps = {
  stations: Station[];
  userLocation: { lat: number; lng: number };
  userLocationName: string;
};

export const Map = ({ stations, userLocation, userLocationName }: MapProps) => {
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

      {/* User's current location */}
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Tooltip permanent>You</Tooltip>
        <Popup>
          {userLocationName.toLowerCase() === "unavailable"
            ? "Your location"
            : userLocationName}
        </Popup>
      </Marker>

      {/* Nearby security stations and routes */}
      {stations.map((station) => (
        <Fragment key={`${station.name}-${station.lat}-${station.lng}`}>
          <Marker position={[station.lat, station.lng]}>
            <Tooltip permanent>Security Station</Tooltip>
            <Popup>
              <div>
                <p>
                  <b>Station: </b>
                  {station.name}
                </p>
                <p>
                  <b>Distance: </b>
                  {station.distance / 1000}km
                </p>
              </div>
            </Popup>
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
        </Fragment>
      ))}
    </MapContainer>
  );
};

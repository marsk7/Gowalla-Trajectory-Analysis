import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import ZoomToResults from "./ZoomToResults";
import MapUpdater from "./MapUpdater";
import axios from 'axios';


export default function MapComponent({ checkins, trajectory, friendTrajectory }) {
  return (
    <MapContainer center={[-27.50, 153.01]} zoom={15} style={{ height: "670px", width: "100%" }}>
        <MapUpdater features={checkins.length ? checkins : trajectory.map(coord => ({
          geom: JSON.stringify({ coordinates: [coord[1], coord[0]] })
        }))} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Auto zoom */}
      {checkins.length > 0 && <ZoomToResults features={checkins} />}

      {trajectory.length > 0 && <ZoomToResults features={trajectory.map(coord => ({
        geom: JSON.stringify({ coordinates: [coord[1], coord[0]] })  // change to GeoJSON type
      }))} />}

        {Array.isArray(friendTrajectory) && friendTrajectory.length > 0 && (
          <ZoomToResults
            features={friendTrajectory.flatMap((item) => {
              try {
                const parsed = JSON.parse(item.geom);
                if (parsed.type === "LineString" && Array.isArray(parsed.coordinates)) {
                  return parsed.coordinates.map(([lon, lat]) => ({
                    geom: JSON.stringify({ type: "Point", coordinates: [lon, lat] })
                  }));
                }
              } catch {
                return [];
              }
            })}
          />
        )}


      {/* similar friend trajectory */}
        {Array.isArray(friendTrajectory) &&
          friendTrajectory.map((item, idx) => {
            if (!item || typeof item.geom !== "string") {
              console.warn("Invalid item:", item);
              return null;
            }

            let coords = [];
            try {
              const parsed = JSON.parse(item.geom);
              if (parsed.type === "LineString" && Array.isArray(parsed.coordinates)) {
                coords = parsed.coordinates.map(([lon, lat]) => [lat, lon]);
              } else {
                return null;
              }
            } catch (e) {
              console.warn("Failed to parse geom:", item.geom);
              return null;
            }

            if (coords.length === 0) return null;

            const colors = ["blue", "green", "purple", "orange", "brown"];
            return (
              <Polyline key={idx} positions={coords} color={colors[idx % colors.length]}>
                <Popup>
                  Friend: {item.user_id} <br />
                  Distance: {item.distance?.toFixed(3)}
                </Popup>
              </Polyline>
            );
          })}


      {checkins.map((item, idx) => {
        const { coordinates } = JSON.parse(item.geom);
        return (
          <Marker key={idx} position={[coordinates[1], coordinates[0]]}>
            <Popup>
              User: {item.user_id || "-"}<br />
              Location: {item.location_id || "-"}<br />
              Time: {item.checkin_time || "-"}
            </Popup>
          </Marker>
        );
      })}

      {trajectory.length > 0 && <Polyline positions={trajectory} color="blue" />}
    </MapContainer>

  );
}




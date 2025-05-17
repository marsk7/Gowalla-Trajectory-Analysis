import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";


export default function MapUpdater({ features = [] }) {
  const map = useMap();

  useEffect(() => {
    if (!features.length) return;

    const bounds = L.latLngBounds(
      features.map((f) => {
        const coords = f.geom
          ? JSON.parse(f.geom).coordinates
          : f.coordinates
            ? JSON.parse(f.coordinates).coordinates
            : [f.longitude, f.latitude];
        return [coords[1], coords[0]];
      })
    );

    map.fitBounds(bounds, { padding: [30, 30] });
  }, [features, map]);

  return null;
}

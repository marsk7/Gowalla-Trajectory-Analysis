import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";


export default function ZoomToResults({ features = [] }) {
  const map = useMap();

  useEffect(() => {
    if (!features.length) return;

    const latlngs = features.map((item) => {
      const [lon, lat] = JSON.parse(item.geom).coordinates;
      return [lat, lon];
    });

    // Auto zoom into result
    const bounds = latlngs.length === 1
      ? latlngs
      : L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [features, map]);

  return null;
}

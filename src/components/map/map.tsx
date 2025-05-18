import {
  GoogleMap,
  useJsApiLoader,
  OverlayViewF,
  OverlayView,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import icon from "@/assets/vite.svg";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMapForm } from "../providers/map-provider";
import CustomMarker from "./CustomMarker";

const center = { lat: 43.675694, lng: -79.376631 };

function MapObject() {
  const { form } = useMapForm();
  const ghosts = useQuery(api.ghosts.get) ?? [];

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi", // Target Points of Interest
      elementType: "geometry", // Target the actual icons/shapes
      stylers: [
        { visibility: "off" }, // Turn off visibility
      ],
    },
  ];

  return (
    <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={1}
        onDblClick={(e) => {
          if (!form) return;
          form.setValue("lat", e.latLng?.lat() ?? 0);
          form.setValue("long", e.latLng?.lng() ?? 0);
        }}
        options={{
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          disableDoubleClickZoom: true,
        }}
      >
        <>
          {ghosts.map((g) => (
            <CustomMarker key={g._id} ghost={g} />
          ))}
        </>
      </GoogleMap>
    </div>
  );
}

export default MapObject;

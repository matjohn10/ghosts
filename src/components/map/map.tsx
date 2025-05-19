import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMapForm } from "../providers/map-provider";
import CustomMarker from "./CustomMarker";

const center = { lat: 43.675694, lng: -79.376631 };
const mapZoom = 11;

function MapObject() {
  const { form } = useMapForm();
  const ghosts = useQuery(api.ghosts.get) ?? [];

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
  });
  const [pos, setPos] = useState(center);
  //const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(mapp: google.maps.Map) {
    mapp.setZoom(mapZoom);
    //setMap(mapp);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    //setMap(null);
  }, []);

  function success(position: GeolocationPosition) {
    console.log(
      "Latitude: " + position.coords.latitude,
      "Longitude: " + position.coords.longitude
    );
    setPos({ lat: position.coords.latitude, lng: position.coords.longitude });
  }

  function error() {
    console.log("No position");
    //alert("Sorry, no position available.");
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => success(p), error, {
        timeout: 5000,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
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
        center={pos}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={mapZoom}
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

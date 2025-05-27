import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMapForm } from "../providers/map-provider";
import CustomMarker from "./CustomMarker";
import { useTheme } from "../providers/theme-provider";
import { darkMapStyles, mapStyles } from "@/assets/map-styles";

const center = { lat: 43.675694, lng: -79.376631 };
const dlat = 0.192952121988057;
const dlng = 0.308990478515625;
const initBounds = {
  lat1: center.lat - dlat,
  lat2: center.lat + dlat,
  long1: center.lng - dlng,
  long2: center.lng + dlng,
};
const mapZoom = 11;

function MapObject() {
  const { form } = useMapForm();
  const { theme } = useTheme();
  const [pos, setPos] = useState(center);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bound, setBound] = useState(initBounds);
  //const ghosts = useQuery(api.ghosts.get) ?? [];
  const ghosts = useQuery(api.ghosts.getClose, bound) ?? [];

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
  });

  const onLoad = useCallback(function callback(mapp: google.maps.Map) {
    mapp.setZoom(mapZoom);
    const bounds = mapp.getBounds();
    if (bounds) {
      const b2 = bounds.getNorthEast().toJSON();
      const b1 = bounds.getSouthWest().toJSON();
      setBound({ lat1: b1.lat, lat2: b2.lat, long1: b1.lng, long2: b2.lng });
    }

    setMap(mapp);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  function success(position: GeolocationPosition) {
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

    if (!localStorage.getItem("visit"))
      alert(
        "Please be truthful. It is made to help people that are interested in paranormal activities."
      );

    localStorage.setItem("visit", "true");
  }, []);

  const handleBounds = () => {
    const bounds = map?.getBounds();
    if (bounds) {
      const b2 = bounds.getNorthEast().toJSON();
      const b1 = bounds.getSouthWest().toJSON();
      //const c = bounds.getCenter().toJSON();
      setBound({ lat1: b1.lat, lat2: b2.lat, long1: b1.lng, long2: b2.lng });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="w-full h-full rounded-xl  overflow-hidden relative">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
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
          styles: theme === "light" ? mapStyles : darkMapStyles,
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
      <button
        className="absolute w-auto px-4 py-1 bottom-8 right-24 z-10 bg-white rounded-4xl shadow-sm shadow-primary/50 hover:bg-white/90 hover:cursor-pointer active:bg-primary/70"
        onClick={handleBounds}
      >
        <p className="text-black/65 text-sm">Search this location</p>
      </button>
    </div>
  );
}

export default MapObject;

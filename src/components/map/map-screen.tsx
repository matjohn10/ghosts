import MapObject from "./map";
import MapForm from "./map-form";

function MapScreen() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Map Section */}
      <div className="w-full md:w-1/2 lg:w-2/3 min-h-[50vh] p-4 md:p-8 md:min-h-screen flex items-center justify-center text-white">
        <MapObject />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 md:p-8 overflow-y-auto">
        <MapForm />
      </div>
    </div>
  );
}

export default MapScreen;

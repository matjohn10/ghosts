import { useAuthActions } from "@convex-dev/auth/react";
import MapFormProvider from "../providers/map-provider";
import { Button } from "../ui/button";
import MapObject from "./map";
import MapForm from "./map-form";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import Spin from "../spinner";

function MapScreen() {
  const isAuth = useQuery(api.auth.isAuthenticated);
  const navigate = useNavigate();
  const { signOut } = useAuthActions();
  const [loading, setLoading] = useState(false);
  return (
    <MapFormProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Map Section */}
        <div className="w-full md:w-1/2 lg:w-2/3 min-h-[50vh] p-4 md:p-8 md:min-h-screen flex items-center justify-center text-white">
          <MapObject />
        </div>

        {/* Form Section */}
        <div className="flex-col w-full md:w-1/2 lg:w-1/3 p-4 md:p-8 overflow-y-auto space-y-4">
          <div className="w-full flex justify-end">
            {isAuth ? (
              <Button
                onClick={async () => {
                  setLoading(true);
                  await signOut();
                  setLoading(false);
                  alert("Logout successful!");
                }}
              >
                {loading && <Spin />} Logout
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>Sign In</Button>
            )}
          </div>
          <MapForm />
        </div>
      </div>
    </MapFormProvider>
  );
}

export default MapScreen;

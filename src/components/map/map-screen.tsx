import { useAuthActions } from "@convex-dev/auth/react";
import MapFormProvider from "../providers/map-provider";
import { Button } from "../ui/button";
import MapObject from "./map";
import MapForm from "./map-form";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spin from "../spinner";
import { ModeToggle } from "../mode-toggle";

function MapScreen() {
  const isAuth = useQuery(api.auth.isAuthenticated);
  const navigate = useNavigate();
  const { signOut } = useAuthActions();
  const [loading, setLoading] = useState(false);
  return (
    <MapFormProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Map Section */}
        <div className="w-full md:w-1/2 lg:w-2/3 h-[70vh] p-4 md:p-8 md:min-h-screen flex items-center justify-center text-white">
          <MapObject />
        </div>

        {/* Form Section */}
        <div className="flex-col w-full md:w-1/2 lg:w-1/3  md:min-h-screen p-4 md:p-8 overflow-y-auto space-y-4">
          <div className="w-full hidden md:flex justify-between gap-6">
            <Link to="/">
              <div className="flex items-center hover:cursor-pointer">
                <img src="logo-2.png" alt="ghosts-logo" className="h-12 w-12" />
                <h1 className="text-foreground text-2xl font-bold">Ghosts</h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <ModeToggle />
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
          </div>
          <MapForm />
        </div>
      </div>
    </MapFormProvider>
  );
}

export default MapScreen;

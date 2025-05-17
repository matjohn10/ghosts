import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "./index.css";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MapScreen from "./components/map/map-screen.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="map" element={<MapScreen />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ConvexProvider>
  </StrictMode>
);

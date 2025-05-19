import { Link } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Ghost background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 bg-white" />
        <div className="absolute z-30 w-1/3 aspect-1 top-10">
          <img src="/logo.png" className="w-full" />
        </div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 tracking-tight drop-shadow-lg">
          Find My Ghost
        </h1>

        <p className="w-2/3 text-xl md:text-2xl font-medium mb-10 text-background max-w-2xl drop-shadow-md">
          <span className="italic">
            Every whisper, every chill, every shadow has a story. Share yours.
          </span>
        </p>

        <Link to="/map">
          <Button variant="default" className="hover:cursor-pointer">
            Report a Sighting
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default App;

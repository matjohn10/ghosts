import { Link } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-start overflow-hidden bg-foreground/50 p-24">
      {/* Ghost background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 bg-background/30" />
        <div className="absolute z-10 w-full h-full">
          <img src="/bg-test.png" className="w-full object-fill" />
        </div>
      </div>

      <div className="z-10 flex flex-col w-[500px] items-center justify-center text-center p-4 bg-black rounded-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
          Find My Ghost
        </h1>

        <p className="w-2/3 text-lg md:text-xl font-medium mb-10 text-white max-w-2xl drop-shadow-md">
          <span className="italic">
            Every whisper, every chill, every shadow has a story. Share yours.
          </span>
        </p>

        <Link to="/map">
          <Button
            variant="default"
            className="hover:cursor-pointer px-10 py-6 font-bold"
          >
            Report a Sighting
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default App;

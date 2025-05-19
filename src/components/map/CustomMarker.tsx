import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import type { Doc } from "convex/_generated/dataModel";
import { TbGhost2 } from "react-icons/tb";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Spin from "../spinner";

function CustomMarker({ ghost }: { ghost: Doc<"ghosts"> }) {
  const [opened, setOpened] = useState(false);
  const encountered = useQuery(api.encounters.get, { g: ghost._id, opened });
  const updateEncounter = useMutation(api.encounters.updateEncounter);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpened(false);
  }, []);

  return (
    <OverlayViewF
      position={{ lat: ghost.lat, lng: ghost.long }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-4 h-4 bg-primary" onClick={() => setOpened(true)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="w-full flex justify-center">
            <div className="flex absolute -top-12 bg-background w-24 h-24 rounded-t-full items-center justify-center">
              <div className="text-4xl">
                <TbGhost2 className="w-12 h-12  text-foreground" />
              </div>
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl">{ghost.name}</DialogTitle>
            <DialogDescription className="flex flex-col text-md">
              <span>
                Found in{" "}
                <span className="underline decoration-primary decoration-3">
                  {ghost.location}
                </span>
              </span>
              <span>
                <span className="underline decoration-primary decoration-3">
                  {ghost.personality}
                </span>{" "}
                personality
              </span>
              <span>
                Seen{" "}
                <span className="underline decoration-primary decoration-3">
                  {encountered?.count ?? 0} times
                </span>
              </span>
              <span>
                Abnormal appearance as{" "}
                <span className="underline decoration-primary decoration-3">
                  {ghost.presence ?? "Cold Spots"}
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={encountered?.encountered}
                onCheckedChange={async () => {
                  setLoading(true);
                  await updateEncounter({
                    id: ghost._id,
                    encounter: !encountered?.encountered,
                  });
                  setLoading(false);
                }}
                className="border-primary border-2"
              />
              <label
                htmlFor="terms"
                className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Have you seen {ghost.name}?
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive" type="button" disabled={loading}>
                {loading ? <Spin /> : "Close"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OverlayViewF>
  );
}

export default CustomMarker;

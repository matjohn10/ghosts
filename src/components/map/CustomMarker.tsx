import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import type { Doc } from "convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

function CustomMarker({ ghost }: { ghost: Doc<"ghosts"> }) {
  return (
    <OverlayViewF
      position={{ lat: ghost.lat, lng: ghost.long }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-4 h-4 bg-primary" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ghost 👻 - {ghost.name}</DialogTitle>
            <DialogDescription>
              {ghost.location} - {ghost.personality}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OverlayViewF>
  );
}

export default CustomMarker;

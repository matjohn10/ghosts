import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { useMapForm } from "../providers/map-provider";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Sample data for comboboxes
const personalityTypes = [
  { label: "Friendly", value: "Friendly" },
  { label: "Mischievous", value: "Mischievous" },
  { label: "Vengeful", value: "Vengeful" },
  { label: "Protective", value: "Protective" },
  { label: "Shy", value: "Shy" },
  { label: "Curious", value: "Curious" },
  { label: "Playful", value: "Playful" },
  { label: "Sad", value: "Sad" },
  { label: "Angry", value: "Angry" },
  { label: "Confused", value: "Confused" },
  { label: "Benevolent", value: "Benevolent" },
  { label: "Territorial", value: "Territorial" },
];

const locations = [
  { label: "Old Mansion", value: "Old Mansion" },
  { label: "Abandoned Hospital", value: "Abandoned Hospital" },
  { label: "Cemetery", value: "Cemetery" },
  { label: "Forest", value: "Forest" },
  { label: "School", value: "School" },
  { label: "Library", value: "Library" },
  { label: "Lighthouse", value: "Lighthouse" },
  { label: "Abandoned Mine", value: "Abandoned Mine" },
  { label: "Old Prison", value: "Old Prison" },
  { label: "Antique Shop", value: "Antique Shop" },
  { label: "Bridge", value: "Bridge" },
  { label: "Farmhouse", value: "Farmhouse" },
  { label: "Theatre", value: "Theatre" },
];

const presenceTypes = [
  { label: "Visual Apparition", value: "Visual Apparition" },
  { label: "Sound/Voices", value: "Sound/Voices" },
  { label: "Temperature Drop", value: "Temperature Drop" },
  { label: "Moving Objects", value: "Moving Objects" },
  { label: "Strange Smells", value: "Strange Smells" },
  { label: "Electrical Interference", value: "Electrical Interference" },
  { label: "Physical Touch", value: "Physical Touch" },
  { label: "Shadow Figure", value: "Shadow Figure" },
  { label: "Energy Drain", value: "Energy Drain" },
  { label: "Disembodied Laughter", value: "Disembodied Laughter" },
  { label: "Cold Spots", value: "Cold Spots" },
  { label: "Growling", value: "Growling" },
];

function MapForm() {
  const isAuth = useQuery(api.auth.isAuthenticated);
  const { form, onSubmit } = useMapForm();
  if (!form) return <div>No form error</div>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a Ghost Sighting</CardTitle>
        <CardDescription>
          Fill out the form below to report a ghost sighting in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Ghost Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ghost Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter ghost name"
                      value={field.value || ""}
                      onChange={(e) => {
                        form.setValue("name", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Ghost Personality */}
            <FormField
              control={form.control}
              name="personality"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ghost Personality</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? personalityTypes.find(
                                (personality) =>
                                  personality.value === field.value
                              )?.label
                            : "Select personality"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No personality found.</CommandEmpty>
                          <CommandGroup>
                            {personalityTypes.map((personality) => (
                              <CommandItem
                                key={personality.value}
                                value={personality.value}
                                onSelect={() => {
                                  form.setValue(
                                    "personality",
                                    personality.value
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    personality.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {personality.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Presence Type */}
            <FormField
              control={form.control}
              name="presence"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Presence Type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? presenceTypes.find(
                                (presence) => presence.value === field.value
                              )?.label
                            : "Select presence type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="w-full">
                        <CommandList className="w-full">
                          <CommandEmpty>No presence type found.</CommandEmpty>
                          <CommandGroup className="w-full">
                            {presenceTypes.map((presence) => (
                              <CommandItem
                                className="w-full"
                                key={presence.value}
                                value={presence.value}
                                onSelect={() => {
                                  form.setValue("presence", presence.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    presence.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {presence.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Location</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? locations.find(
                                (location) => location.value === field.value
                              )?.label
                            : "Select location"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={() => {
                                  form.setValue("location", location.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    location.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Latitude */}
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      className="w-full p-2 border rounded"
                      placeholder="Enter latitude (e.g. -40.7128)"
                      value={field.value || ""}
                      onChange={(e) => {
                        form.setValue("lat", Number.parseFloat(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Double click on the map.</FormDescription>
                  {/* <FormDescription>
                    Decimal degrees (e.g. 40.7128)
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Longitude */}
            <FormField
              control={form.control}
              name="long"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      className="w-full p-2 border rounded"
                      placeholder="Enter longitude (e.g. -74.0060)"
                      value={field.value || ""}
                      onChange={(e) => {
                        form.setValue(
                          "long",
                          Number.parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>Double click on the map.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isAuth ? (
              <Button type="submit" className="w-full">
                Submit Ghost Sighting
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Sign In to Submit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default MapForm;

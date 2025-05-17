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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Sample data for comboboxes
const personalityTypes = [
  { label: "Friendly", value: "friendly" },
  { label: "Mischievous", value: "mischievous" },
  { label: "Vengeful", value: "vengeful" },
  { label: "Protective", value: "protective" },
  { label: "Shy", value: "shy" },
];

const locations = [
  { label: "Old Mansion", value: "old_mansion" },
  { label: "Abandoned Hospital", value: "abandoned_hospital" },
  { label: "Cemetery", value: "cemetery" },
  { label: "Forest", value: "forest" },
  { label: "School", value: "school" },
  { label: "Library", value: "library" },
];

const presenceTypes = [
  { label: "Visual Apparition", value: "visual" },
  { label: "Sound/Voices", value: "sound" },
  { label: "Temperature Drop", value: "temperature" },
  { label: "Moving Objects", value: "moving_objects" },
  { label: "Strange Smells", value: "smells" },
  { label: "Electrical Interference", value: "electrical" },
];

// Form schema
const formSchema = z.object({
  personality: z.string({
    required_error: "Please select a personality type.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  latitude: z.coerce.number({
    required_error: "Please enter latitude.",
  }),
  longitude: z.coerce.number({
    required_error: "Please enter longitude.",
  }),
  name: z.string({
    required_error: "Please enter a name for the ghost.",
  }),
  presence: z.string({
    required_error: "Please select a presence type.",
  }),
});

function MapForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personality: "",
      location: "",
      latitude: undefined,
      longitude: undefined,
      name: "",
      presence: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Ghost sighting submitted!");
  }
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
              name="latitude"
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
                        form.setValue(
                          "latitude",
                          Number.parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Decimal degrees (e.g. 40.7128)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Longitude */}
            <FormField
              control={form.control}
              name="longitude"
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
                          "longitude",
                          Number.parseFloat(e.target.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Decimal degrees (e.g. -74.0060)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Ghost Sighting
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default MapForm;

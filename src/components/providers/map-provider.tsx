import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, type PropsWithChildren } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

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

type FormContext = {
  form: UseFormReturn<z.infer<typeof formSchema>> | null;
  onSubmit(values: z.infer<typeof formSchema>): void;
};

const formContext = createContext<FormContext>({
  form: null,
  onSubmit: () => null,
});

function MapFormProvider({ children }: PropsWithChildren) {
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
    <formContext.Provider value={{ form, onSubmit }}>
      {children}
    </formContext.Provider>
  );
}

export default MapFormProvider;

export const useMapForm = () => useContext(formContext);

import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../convex/_generated/api";
import type { InsertGhost } from "../../../convex/ghosts";
import { useMutation, useQuery } from "convex/react";
import { createContext, useContext, type PropsWithChildren } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";

// Form schema
const formSchema = z.object({
  personality: z.string({
    required_error: "Please select a personality type.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  lat: z.coerce.number({
    required_error: "Please enter latitude.",
  }),
  long: z.coerce.number({
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
  const isAuth = useQuery(api.auth.isAuthenticated);
  const addGhost = useMutation(api.ghosts.createGhost);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personality: "",
      location: "",
      lat: undefined,
      long: undefined,
      name: "",
      presence: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isAuth) {
      navigate("/auth");
      return;
    }
    const res = await addGhost({
      form: values as InsertGhost,
    });
    if (!res) {
      alert("Error Saving! Try again.");
      return;
    }
    // Here you would typically send the data to your backend
    form.reset();
    form.resetField("lat");
    form.resetField("long");
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

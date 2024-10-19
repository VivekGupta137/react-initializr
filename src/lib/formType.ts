import { z } from "zod";

export const templateFormSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: "URL is required",
    })
    .url({ message: "Please enter a valid URL" })
    .refine((val) => val.includes("raw.githubusercontent.com"), {
      message: "URL must be a raw.githubusercontent.com link",
    }),
});

export const templateInitialState = {
  url: "",
};

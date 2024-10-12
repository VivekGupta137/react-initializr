import { z } from "zod";

export const templateFormSchema = z.object({
  url: z.string().min(1, {
    message: "URL is required",
  }),
});

export const templateInitialState = {
  url: "",
};

"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { actionAddTemplate } from "@/actions/action";
import { useFormState, useFormStatus } from "react-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { templateFormSchema, templateInitialState } from "@/lib/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import FormSubmitButton from "@/components/FormSubmitButton";
import { Dispatch, SetStateAction, useState } from "react";

const TemplateForm = ({dialogOpen}: {dialogOpen: Dispatch<SetStateAction<boolean>>}) => {
  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: templateInitialState,
  });

  const [pending, setPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof templateFormSchema>) => {
    setPending(true);
    const resp = await actionAddTemplate(data);
    setPending(false);
    dialogOpen(false);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="raw.github...." {...field} />
                  </FormControl>
                  <FormDescription>
                    You need to share the package.json file.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <FormSubmitButton pending={pending}>Save changes</FormSubmitButton>
          </DialogFooter>
          
        </form>
      </Form>
    </div>
  );
};

export default TemplateForm;

"use client";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { actionAddTemplate } from "@/actions/action";
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
import FormSubmitButton from "@/components/FormSubmitButton";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const TemplateForm = ({
  dialogOpen,
}: {
  dialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: templateInitialState,
  });

  const [pending, setPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof templateFormSchema>) => {
    setPending(true);
    await actionAddTemplate(data);
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
                  <FormLabel>Link to raw package.json</FormLabel>
                  <FormControl>
                    <Input placeholder="raw.github...." {...field} />
                  </FormControl>
                  <FormDescription>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-0">
                        <div className="flex justify-between">
                          <div>You need to share the package.json file.</div>
                          <div>
                            <AccordionTrigger className="py-0 text-blue-500 text-[12.8px]">
                              check example
                            </AccordionTrigger>
                          </div>
                        </div>
                        <AccordionContent className="py-3">
                          <div className="w-full break-all">
                            <h2 className="text-lg text-primary">
                            Example link to package.json file:
                            </h2>
                            
                            <div>
                              <span className=" text-[0.8rem]">
                                {
                                  "raw.githubusercontent.com/{owner}/{repo}/refs/heads/main/package.json"
                                }
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="text-primary">
                                <h2 className="text-lg">Steps to get the link:</h2>
                              </div>
                              <div>
                                <div>
                                  1. Go to the repository on GitHub.
                                </div>
                                <div>
                                  2. Click on the code button and select the main
                                  branch.
                                </div>
                                <div>
                                  3. Click on the package.json file.
                                </div>
                                <div>
                                  4. Click on the raw button.
                                  <Image quality={90} src={"/gh-raw-content.png"} alt="github raw button location" width={375} height={170} />
                                </div>
                                <div>
                                  5. Copy the URL from the browser.
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* raw.githubusercontent.com/{owner}/{repo}/refs/heads/main/package.json */}
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

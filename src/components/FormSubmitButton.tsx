"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const FormSubmitButton = ({ children, pending }: {children: React.ReactNode, pending: boolean}) => {
  return (
    <div>
      {!pending && <Button type="submit">{children}</Button>}
      {pending && (
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </div>
  );
};

export default FormSubmitButton;

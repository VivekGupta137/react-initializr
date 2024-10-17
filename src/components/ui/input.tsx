import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8" : "",
            endIcon ? "sm:pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && React.cloneElement(StartIcon as React.ReactElement, {
          className: "absolute left-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-900"
        })}
        {EndIcon && React.cloneElement(EndIcon as React.ReactElement, {
          className: "hidden sm:block absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
        })}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

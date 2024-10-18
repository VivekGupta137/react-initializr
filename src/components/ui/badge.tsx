import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  closeable?: boolean;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  const { closeable , children} = props;
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        closeable ? "flex gap-2 group pr-0 py-0 items-center" : "",
        className
      )}
      {...props}
    >
      <div className="py-0.5">
        {children}
      </div>
      {closeable && <div className="group-hover:bg-red-500 rounded-sm rounded-l-none py-0.5 transition-all px-1"><X className="size-4" /></div>}
    </div>
  );
}

export { Badge, badgeVariants };

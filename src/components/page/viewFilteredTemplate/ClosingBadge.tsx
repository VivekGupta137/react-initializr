import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updatePkgNames } from "@/lib/filterUtils";
import { X } from "lucide-react";

type ClosingBadgeProps = BadgeProps;

const ClosingBadge = (props: ClosingBadgeProps) => {
  return (
    <Badge variant="secondary" className="group flex py-0 pr-0 pl-2 h-6 gap-2" onClick={props.onClick}>
      <div>
        {updatePkgNames(props.children as string)}
      </div>
      <Button variant="outline" className="p-0 h-4 mr-1 group-hover:bg-red-700">
        <X className="size-4" />
      </Button>
    </Badge>
  );
};

export default ClosingBadge;

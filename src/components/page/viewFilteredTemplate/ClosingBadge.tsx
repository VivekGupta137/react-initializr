import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updatePkgNames } from "@/lib/filterUtils";
import { X } from "lucide-react";

type ClosingBadgeProps = BadgeProps;

const ClosingBadge = (props: ClosingBadgeProps) => {
  return (
    <Badge variant="secondary" closeable onClick={props.onClick}>
      {updatePkgNames(props.children as string)}
    </Badge>
  );
};

export default ClosingBadge;

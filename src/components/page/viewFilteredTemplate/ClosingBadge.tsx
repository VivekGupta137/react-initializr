import { Badge, BadgeProps } from "@/components/ui/badge";
import { updatePkgNames } from "@/lib/filterUtils";
import { useTransition } from "react";

type ClosingBadgeProps = BadgeProps;

const ClosingBadge = (props: ClosingBadgeProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Badge
      variant="secondary"
      closeable
      onClick={() => startTransition(() => props.onClick())}
      loading={isPending}
      
    >
      {updatePkgNames(props.children as string)}
    </Badge>
  );
};

export default ClosingBadge;

"use client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { GoStar , GoStarFill } from "react-icons/go";
import { GiStarsStack } from "react-icons/gi";
const SuperStar = () => {
  const userClapCount =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("clapCount") as string) || 0
      : 0;
  const clipPercentage = userClapCount >= 4 ? 0 : 100 - userClapCount * 25;
  return (
    <div>
      {userClapCount == 0 && <GoStar className="size-8" />}
      {userClapCount > 0 && (
        <div >
          <GoStarFill
            className="size-8 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
            style={{ clipPath: `inset(0 ${clipPercentage}% 0 0)` }}
          />
          <GoStar
            className="size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground"
            style={{ clipPath: `inset(0 0 0 ${100-clipPercentage}%)` }}
          />
        </div>
      )}
    </div>
  );
};

export default SuperStar;

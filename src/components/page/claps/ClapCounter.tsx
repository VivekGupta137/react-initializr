"use client";
import { FaHandsClapping } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { addClap, getClaps } from "@/actions/action";
import { useEffect, useState } from "react";
import { Heart, StarIcon } from "lucide-react";
import { HeartFilledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import {motion} from "framer-motion";
import SuperStar from "./SuperStar";
const ClapCounter = () => {
  const [claps, setClaps] = useState(0);
  const userClapCount =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("clapCount") as string) || 0
      : 0;

  useEffect(() => {
    getClaps().then((clapsCount) => {
      setClaps(clapsCount.clap);
    });
  }, []);

  return (
    <motion.div layout className="flex justify-center md:flex-col items-center gap-1">
      <Button
        size={"icon"}
        variant={"ghost"}
        disabled={userClapCount >= 10}
        className="rounded-md relative size-8"
        onClick={async () => {
          const clapsCount = await addClap();
          setClaps(clapsCount.clap);
          localStorage.setItem("clapCount", userClapCount + 1 + "");
        }}
      >
        <SuperStar />
      </Button>
      {claps>0 && <p>+{claps}</p>}
    </motion.div>
  );
};

export default ClapCounter;

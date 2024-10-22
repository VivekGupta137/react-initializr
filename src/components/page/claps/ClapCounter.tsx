"use client";
import { FaHandsClapping } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { addClap, getClaps } from "@/actions/action";
import { useEffect, useState } from "react";

const ClapCounter = () => {
  const [claps, setClaps] = useState(0);
const userClapCount = typeof window !== "undefined" ? parseInt(localStorage.getItem("clapCount") as string) || 0 : 0;

  useEffect(() => {
    getClaps().then((clapsCount) => {
      setClaps(clapsCount.clap);
    });
  }, []);

  return (
    <div className="hidden md:block md:absolute pr-5 -translate-x-full -translate-y-full text-center">
      <Button
        size={"icon"}
        variant={"ghost"}
        disabled={userClapCount >= 10 }
        className="rounded-md p-0.5"
        onClick={async () => {
          const clapsCount = await addClap();
          setClaps(clapsCount.clap);
          localStorage.setItem("clapCount", userClapCount + 1 + "");
        }}
      >
        <FaHandsClapping className="size-10" />
      </Button>
      <p>+{claps}</p>
    </div>
  );
};

export default ClapCounter;

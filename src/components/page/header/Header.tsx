import "server-only";
import Title from "./Title";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ClapCounter from "../claps/ClapCounter";

const Header = () => {
  return (
    <div className="border-b sm:border-b-1 ">
      <div className="flex justify-between pb-5">
        <Title />
      </div>
      <div className="md:hidden flex justify-end relative items-center gap-2 mb-2">
        <Link
          href="https://github.com/VivekGupta137/react-initializr"
          aria-label="github url"
          target="_blank"
        >
          <GitHubLogoIcon className="size-8" />
        </Link>
        <ClapCounter />
      </div>
    </div>
  );
};

export default Header;

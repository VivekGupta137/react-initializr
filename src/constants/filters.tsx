import { FaVuejs } from "react-icons/fa";
import { SiMui } from "react-icons/si";
import { SiDrizzle } from "react-icons/si";
import { SiPrisma } from "react-icons/si";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { SiClerk } from "react-icons/si";
import { SiAuth0 } from "react-icons/si";
import { SiEsbuild } from "react-icons/si";
import { SiVite } from "react-icons/si";
import { SiWebpack } from "react-icons/si";
import {
  RiNextjsLine,
  RiRemixRunFill,
  RiTailwindCssLine,
} from "react-icons/ri";
import { PackageListType } from "@/components/page/filters/PackageFilter";

export const frameworkFilters: PackageListType[] = [
  {
    value: "next",
    label: "Next.js",
    icon: <RiNextjsLine className="size-5" />,
  },
  { value: "vue", label: "Vue", icon: <FaVuejs className="size-5" /> },
  {
    value: "remix",
    label: "Remix",
    icon: <RiRemixRunFill className="size-5" />,
  },
  {
    value: "next",
    label: "Next.js",
    icon: <RiNextjsLine className="size-5" />,
  },
  { value: "vue", label: "Vue", icon: <FaVuejs className="size-5" /> },
  {
    value: "remix",
    label: "Remix",
    icon: <RiRemixRunFill className="size-5" />,
  },{
    value: "next",
    label: "Next.js",
    icon: <RiNextjsLine className="size-5" />,
  },
  { value: "vue", label: "Vue", icon: <FaVuejs className="size-5" /> },
  {
    value: "remix",
    label: "Remix",
    icon: <RiRemixRunFill className="size-5" />,
  },
];
export const cssFilters: PackageListType[] = [
  {
    value: "tailwindcss",
    label: "Tailwind",
    icon: <RiTailwindCssLine className="size-5" />,
  },
  {
    value: "@mui/material",
    label: "Material UI",
    icon: <SiMui className="size-5" />,
  },
];
export const ormFilters: PackageListType[] = [
  {
    value: "drizzle-orm",
    label: "Drizzle",
    icon: <SiDrizzle className="size-5" />,
  },
  {
    value: "@prisma/client",
    label: "Prisma",
    icon: <SiPrisma className="size-5" />,
  },
];

export const authenticationFilters: PackageListType[] = [
  {
    value: "next-auth",
    label: "Next Auth",
    icon: <RiShieldKeyholeFill className="size-5" />,
  },
  {
    value: "@clerk",
    label: "Clerk Auth",
    icon: <SiClerk className="size-5" />,
  },
  {
    value: "auth0",
    label: "Auth0",
    icon: <SiAuth0 className="size-5" />,
  },
];

export const bundlerFilters: PackageListType[] = [
  {
    value: "vite",
    label: "Vite",
    icon: <SiVite className="size-5" />,
  },
  {
    value: "webpack",
    label: "Webpack",
    icon: <SiWebpack className="size-5" />,
  },
  {
    value: "esbuild$",
    label: "ESBuild",
    icon: <SiEsbuild className="size-5" />,
  },
];

export const filters = [
  {
    title: "Framework",
    filters: frameworkFilters,
  },
  {
    title: "CSS",
    filters: cssFilters,
  },
  {
    title: "ORM",
    filters: ormFilters,
  },
  {
    title: "Authentication",
    filters: authenticationFilters,
  },
  {
    title: "Module bundler",
    filters: bundlerFilters,
  },
];

import { FaVuejs } from "react-icons/fa";
import {
  SiFirebase,
  SiFormik,
  SiMobx,
  SiMui,
  SiReacthookform,
  SiRedux,
  SiSnowpack,
  SiTurborepo,
} from "react-icons/si";
import { SiDrizzle } from "react-icons/si";
import { SiPrisma } from "react-icons/si";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { SiClerk } from "react-icons/si";
import { SiAuth0 } from "react-icons/si";
import { SiEsbuild } from "react-icons/si";
import { SiVite } from "react-icons/si";
import { SiWebpack } from "react-icons/si";
import { SiQwik } from "react-icons/si";
import { SiSvelte } from "react-icons/si";
import {
  RiNextjsLine,
  RiRemixRunFill,
  RiTailwindCssLine,
} from "react-icons/ri";
import { FilterType } from "@/components/page/filters/FilterSection";
import { SiChakraui } from "react-icons/si";
import { SiTypeorm } from "react-icons/si";
import { SiSequelize } from "react-icons/si";
export const frameworkFilters: FilterType[] = [
  {
    value: "next",
    label: "Next.js",
    icon: <RiNextjsLine className="size-5" />,
  },
  {
    value: "remix",
    label: "Remix",
    icon: <RiRemixRunFill className="size-5" style={{ color: "#663399" }} />,
  },
  {
    value: "vue",
    label: "Vue.js",
    icon: <FaVuejs className="size-5" style={{ color: "#42b883" }} />,
  },
  {
    value: "qwik",
    label: "Qwik",
    icon: <SiQwik className="size-5" />,
  },
  {
    value: "svelte",
    label: "Svelte",
    icon: <SiSvelte className="size-5" style={{ color: "#FF3E00" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];
export const cssFilters: FilterType[] = [
  {
    value: "tailwindcss",
    label: "Tailwind",
    icon: <RiTailwindCssLine className="size-5" style={{ color: "#38B2AC" }} />,
  },
  {
    value: "@mui/material",
    label: "Material UI",
    icon: <SiMui className="size-5" style={{ color: "#007FFF" }} />,
  },
  {
    value: "@chakra-ui",
    label: "Chakra UI",
    icon: <SiChakraui className="size-5" style={{ color: "#319795" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];
export const ormFilters: FilterType[] = [
  {
    value: "drizzle-orm",
    label: "Drizzle",
    icon: <SiDrizzle className="size-5" style={{ color: "#FFCC00" }} />,
  },
  {
    value: "@prisma/client",
    label: "Prisma",
    icon: <SiPrisma className="size-5" />,
  },
  {
    value: "typeorm",
    label: "TypeORM",
    icon: <SiTypeorm className="size-5" style={{ color: "#00758F" }} />,
  },
  {
    value: "sequelize",
    label: "Sequelize",
    icon: <SiSequelize className="size-5" style={{ color: "#52B0E7" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];

export const authenticationFilters: FilterType[] = [
  {
    value: "next-auth",
    label: "Next Auth",
    icon: <RiShieldKeyholeFill className="size-5" />,
  },
  {
    value: "@clerk",
    label: "Clerk Auth",
    icon: <SiClerk className="size-5" style={{ color: "#3B82F6" }} />,
  },
  {
    value: "auth0",
    label: "Auth0",
    icon: <SiAuth0 className="size-5" style={{ color: "#EB5424" }} />,
  },
  {
    value: "firebase",
    label: "Firebase",
    icon: <SiFirebase className="size-5" style={{ color: "#FFCA28" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];

export const bundlerFilters: FilterType[] = [
  {
    value: "vite",
    label: "Vite",
    icon: <SiVite className="size-5" style={{ color: "#646CFF" }} />,
  },
  {
    value: "webpack",
    label: "Webpack",
    icon: <SiWebpack className="size-5" style={{ color: "#8DD6F9" }} />,
  },
  {
    value: "snowpack",
    label: "Snowpack",
    icon: <SiSnowpack className="size-5" style={{ color: "#E4E4E4" }} />,
  },
  {
    value: "turbo",
    label: "Turbopack",
    icon: <SiTurborepo className="size-5" style={{ color: "#EF4444" }} />,
  },
  {
    value: "esbuild",
    label: "ESBuild",
    icon: <SiEsbuild className="size-5" style={{ color: "#FFCF00" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];

export const manageStateFilters: FilterType[] = [
  {
    value: "zustand",
    label: "Zustand",
  },
  {
    value: "redux",
    label: "Redux",
    icon: <SiRedux className="size-5" style={{ color: "#764ABC" }} />,
  },
  {
    value: "mobx",
    label: "MobX",
    icon: <SiMobx className="size-5" style={{ color: "#FF9955" }} />,
  },
  {
    value: "",
    label: "Any",
  },
];
export const formFilters: FilterType[] = [
  {
    value: "react-hook-form",
    label: "React Hook Form",
    icon: <SiReacthookform className="size-5" style={{ color: "#EC5990" }} />,
  },
  {
    value: "formik",
    label: "Formik",
    icon: <SiFormik className="size-5" style={{ color: "#FF7F50" }} />,
  },
  { value: "final-form", label: "Final Form" },
  { value: "", label: "Any" },
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
  {
    title: "State management",
    filters: manageStateFilters,
  },
  {
    title: "Form",
    filters: formFilters,
  },
];

import "server-only";
import Header from "@/components/page/header/Header";
import ViewFilteredTemplate from "@/components/page/viewFilteredTemplate";
import { Suspense } from "react";
import RadioFilters from "@/components/page/RadioFilters";
import Footer from "@/components/page/footer/Footer";
import AddTemplate from "@/components/page/addTemplate/AddTemplate";
import ViewFilterLoader from "@/components/page/viewFilteredTemplate/ViewFilterLoader";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface HomeProps {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container m-auto min-h-lvh relative">
      <div className="sm:px-5 md:px-20 ">
      <div className="border-l border-r px-5 min-h-lvh flex flex-col h-full">
        <Header />
        
        <div className="flex gap-0 sm:px-0 flex-col lg:flex-row pb-20 self-stretch grow">
          <div className="basis-1/2 shrink-0 my-10 lg:border-r-1">
            <RadioFilters searchParams={searchParams} />
          </div>

          <div className="basis-1/2 shrink-0 my-10 lg:pl-5">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex justify-between border-b pb-2">
                <h2 className="text-primary text-xl font-bold">Templates</h2>
                <div className="flex gap-2">
                  <AddTemplate />
                </div>
              </div>
              <Suspense
                key={JSON.stringify(searchParams)}
                fallback={<ViewFilterLoader />}
              >
                <ViewFilteredTemplate searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 h-20 w-full">
          <div className="container m-auto sm:px-5 md:px-20 h-full relative ">
          <div className="hidden md:block md:absolute pr-5 -translate-x-full bottom-5">
            <Link href="https://github.com/VivekGupta137/react-initializr" aria-label="github url" target="_blank">
              <GitHubLogoIcon className="size-10"/>
            </Link>
          </div>
            <div className="w-full bg-[#23272F] h-full border-l border-r ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

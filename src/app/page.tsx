import "server-only";
import Header from "@/components/page/header/Header";
import ViewFilteredTemplate from "@/components/page/viewFilteredTemplate";
import { Suspense } from "react";
import RadioFilters from "@/components/page/RadioFilters";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/page/footer/Footer";

interface HomeProps {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container m-auto sm:px-5 md:px-20 min-h-lvh">
      <div className="border-l border-r px-5 min-h-lvh flex flex-col h-full">
        <Header />

        <div className="flex gap-0 sm:px-0 flex-col lg:flex-row pb-20 self-stretch grow">
          <div className="basis-1/2 shrink-0 my-10 lg:border-r-1">
            <Suspense fallback={<div>Loading...</div>}>
              <RadioFilters />
            </Suspense>
          </div>

          <div className="basis-1/2 shrink-0 my-10 lg:pl-5">
            <Suspense fallback={<div>Loading...</div>}>
              <ViewFilteredTemplate searchParams={searchParams} />
            </Suspense>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 h-20 w-full">
          <div className="container m-auto sm:px-5 md:px-20 h-full ">
            <div className="w-full bg-[#23272F] h-full border-l border-r ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

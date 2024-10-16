import "server-only";
import Filters from "@/components/page/Filters";
import Header from "@/components/page/header/Header";
import ViewFilteredTemplate from "@/components/page/viewFilteredTemplate";
import { Suspense } from "react";
import RadioFilters from "@/components/page/RadioFilters";

interface HomeProps {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container m-auto sm:px-5 md:px-20">
      <Header />

      <div className="flex gap-0 px-2 sm:px-0 flex-col lg:flex-row">
        <div className="basis-1/2 shrink-0 my-10 lg:border-r-1">
          <Suspense fallback={<div>Loading...</div>}>
            <RadioFilters />
          </Suspense>
        </div>
        
        <div className="shrink grow">
          {/* <Suspense fallback={<div>Loading...</div>}>
            <ViewFilteredTemplate searchParams={searchParams} />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}

const dynamic = "force-dynamic";

import "server-only";
import Filters from "@/components/page/Filters";
import Header from "@/components/page/Header";
import ViewFilteredTemplate from "@/components/page/viewFilteredTemplate";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container m-auto border px-5">
      <Header />

      <div className="flex gap-5 ">
        <div className="basis-60 shrink-0 h-full ">
          <Suspense fallback={<div>Loading...</div>}>
            <Filters />
          </Suspense>
        </div>
        <div className="shrink grow">
          <Suspense fallback={<div>Loading...</div>}>
            <ViewFilteredTemplate searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const dynamic = "force-dynamic";

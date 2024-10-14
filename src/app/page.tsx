import "server-only";
import AddTemplate from "@/components/page/addTemplate/AddTemplate";
import Filters from "@/components/page/Filters";
import Header from "@/components/page/Header";
import Image from "next/image";
import ViewFilteredTemplate from "@/components/page/viewFilteredTemplate";

interface HomeProps {
  searchParams: Record<string, string>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="container m-auto border px-5">
      <Header />
      
      <div className="flex gap-5 ">
        <div className="basis-60 shrink-0 h-full ">
          <Filters />
        </div>
        <div className="shrink grow">
          <ViewFilteredTemplate searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}

const dynamic = "force-dynamic";

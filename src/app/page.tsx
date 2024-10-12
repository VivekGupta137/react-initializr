import "server-only"
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
    <div className="container m-auto">
      <Header />
      <div>
        <Filters />
      </div>
      <div>
        <AddTemplate />
      </div>
      <div>
        <ViewFilteredTemplate searchParams={searchParams} />
      </div>
    </div>
  );
}

const dynamic = 'force-dynamic'
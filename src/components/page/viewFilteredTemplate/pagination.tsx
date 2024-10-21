import "server-only";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const MyPagination: React.FC<{
  take: number;
  skip: number;
  count: number;
  searchParams: Record<string, string>;
}> = ({ take, skip, count, searchParams }) => {
  const totalPages = Math.ceil(count / take);
  const currentPage = Math.ceil(skip / take) + 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    const getLink = (page: number) => {
        const search = new URLSearchParams(searchParams);
        search.set("skip", String((page - 1) * take));
        return `?${search.toString()}`;
    }

  return (
    pages.length > 1 && (
      <div className="flex">
        <Pagination className="py-0.5">
        <PaginationContent>
            {pages.map((page) => (
                <PaginationItem key={page}>
                    <PaginationLink href={getLink(page)} isActive={currentPage === page}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}
        </PaginationContent>
      </Pagination>
      </div>
    )
  );
};

export default MyPagination;

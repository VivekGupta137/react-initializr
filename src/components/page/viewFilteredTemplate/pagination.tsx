import { cn } from "@/lib/utils";
import Link from "next/link";
import "server-only"
const MyPagination: React.FC<{take: number; skip: number; count: number; searchParams: Record<string, string>}> = ({take, skip, count, searchParams}) => {
    const totalPages = Math.ceil(count / take);
    const currentPage = Math.ceil(skip / take) + 1;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return  pages.length > 1 && <div className="flex gap-2">
        {pages.map((page) => (
            <Link key={page} href={{ query: { ...searchParams, skip: (page - 1) * take } }} scroll={false}>
                <div className={cn("px-2 py-0.5 rounded-md", { "border-primary border": currentPage === page })}>
                    {page}
                </div>
            </Link>
        ))}
    </div> ;
}
 
export default MyPagination;
import React from "react";
import BlogCard from "./blog-card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export default function BlogList({ locale, data }) {
  const blogs = data?.blog || [];
  const pagination = data?.pagination || {};
  const isEn = locale === "en";

  const { totalCount = 0, totalPages = 1, currentPage = 1 } = pagination;

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  const getPageHref = (page) => `/${locale}/blogs?page=${page}`;

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 6;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <section className="w-full block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2 sm:-mx-2 xl:-mx-2 2xl:-mx-3 [&>*]:p-2 sm:[&>*]:p-2 xl:[&>*]:p-2 2xl:[&>*]:p-3">
          {blogs.map((item) => (
            <div key={item?.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <BlogCard locale={locale} data={item} isEn={isEn} />
            </div>
          ))}
        </div>

        {/* Bottom Section with Pagination */}
        {totalCount > 6 && (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-5 xl:mt-10 2xl:mt-16">
            <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
              Showing {startItem}-{endItem} of{" "}
              {totalCount} blogs
            </div>
            {totalPages > 0 && (
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={currentPage > 1 ? getPageHref(currentPage - 1) : undefined}
                        className={cn(
                          currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                    {getPaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href={getPageHref(item)}
                            isActive={currentPage === item}
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href={currentPage < totalPages ? getPageHref(currentPage + 1) : undefined}
                        className={cn(
                          currentPage === totalPages && "pointer-events-none opacity-50"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

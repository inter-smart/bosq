"use client";
import React, { useCallback, useMemo, useTransition } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const ProductListPagination = ({
  pagination,
  isEn,
  label = "products",
  labelAr = "منتج",
}) => {
  const [isPending, startTransition] = useTransition();

  // Use nuqs for page state - synced with URL
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      history: "push",
      shallow: false,
      startTransition,
    }),
  );

  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;
  const limit = pagination?.limit || ITEMS_PER_PAGE;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);

  // Pagination helpers
  const goToPage = useCallback(
    (page) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(newPage === 1 ? null : newPage); // Remove page param if page 1
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages, setCurrentPage],
  );

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisible = 5;

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
  }, [currentPage, totalPages]);

  if (total === 0) return null;

  return (
    <div
      className={cn(
        "w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-5 xl:mt-10 2xl:mt-16",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
        {isEn
          ? `Showing ${startIndex + 1}-${Math.min(endIndex, total)} of ${total} ${label}`
          : `عرض ${startIndex + 1}-${Math.min(endIndex, total)} من ${total} ${labelAr}`}
      </div>
      {totalPages > 1 && (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    goToPrevious();
                  }}
                  className={cn(
                    "cursor-pointer",
                    currentPage === 1 && "pointer-events-none opacity-50",
                    isEn ? "rotate-0" : "rotate-180",
                  )}
                />
              </PaginationItem>
              {paginationItems.map((item, index) => (
                <PaginationItem key={index}>
                  {item === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(item);
                      }}
                      isActive={currentPage === item}
                      className="cursor-pointer"
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    goToNext();
                  }}
                  className={cn(
                    "cursor-pointer",
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50",
                    isEn ? "rotate-0" : "rotate-180",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductListPagination;

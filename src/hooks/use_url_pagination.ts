import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type PaginationCursor = {
  after: string;
  before: string;
  hasNext: boolean;
  hasPrevious: boolean;
};

type PaginationParams = {
  after?: string;
  before?: string;
};

export const useUrlPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const after = searchParams.get("after") || "";
  const before = searchParams.get("before") || "";
  const currentPageNumber = parseInt(searchParams.get("page") || "1", 10);

  const paginationParams: PaginationParams = {};

  if (after) paginationParams.after = after;
  if (before) paginationParams.before = before;

  const handlePageChange = useCallback(
    (action: "NEXT" | "PREV", paginationCursor: PaginationCursor) => {
      const newParams = new URLSearchParams(searchParams);

      if (action === "NEXT") {
        newParams.set("page", (currentPageNumber + 1).toString());
        newParams.set("after", paginationCursor.after);
        newParams.delete("before");
      } else {
        // action === 'PREV'
        // If going back to page 1, clear all pagination params
        if (currentPageNumber <= 1) {
          newParams.delete("after");
          newParams.delete("before");
          newParams.delete("page");
        } else {
          newParams.set("before", paginationCursor.before);
          newParams.set("page", (currentPageNumber - 1).toString());
          newParams.delete("after");
        }
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams, currentPageNumber],
  );

  return {
    currentPageNumber,
    paginationParams,
    handlePageChange,
    searchParams,
    setSearchParams,
  };
};

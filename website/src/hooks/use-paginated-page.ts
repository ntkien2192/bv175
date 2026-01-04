import { useMemo } from "react";

export const usePaginatedPages = (totalPages: number, curPage: number) => {
    const paginatedPages = useMemo(() => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (curPage <= 2) {
            pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
        } else if (curPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(curPage - 1, curPage, curPage + 1, "...", totalPages - 1, totalPages);
        }

        return pages;
    }, [totalPages, curPage]);

    return paginatedPages;
};
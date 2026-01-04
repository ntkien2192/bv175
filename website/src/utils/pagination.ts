
export const getPaginatedPages = (totalPages: number, curPage: number): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (curPage < 5) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (curPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, "...", curPage - 1, curPage, curPage + 1, "...", totalPages);
    }

    return pages;
};
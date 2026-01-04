'use client';

import NextImg from '@/src/components/common/next-img';
import { getPaginatedPages } from '@/src/utils/pagination';
import { useMemo } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
};

const ThePagination = ({
  currentPage,
  totalPage,
  setPage,
}: PaginationProps) => {
  const pagination = useMemo(
    () => getPaginatedPages(totalPage, currentPage),
    [totalPage, currentPage],
  );
  if (totalPage <= 1) return null;

  return (
    <div className="col-span-full mt-12 flex items-center justify-center gap-[2px] md:mt-14 md:gap-1 lg:mt-16">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
      >
        <div className="relative size-5 rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
          <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
        </div>
      </button>

      {/* Page Numbers */}
      {pagination?.map((item: any, index: any) => (
        <button
          onClick={typeof item === 'number' ? () => setPage(item) : undefined}
          key={`${item}-${index}`}
          className={`${
            currentPage === item
              ? 'bg-primary-600 text-white'
              : 'bg-white text-[#71717A]'
          } ${
            item === '...'
              ? 'pointer-events-none cursor-default'
              : 'cursor-pointer'
          } relative h-9 min-w-9 rounded-[6px] px-3 text-center text-lg font-medium transition-all duration-100 hover:bg-primary-300 hover:text-white md:h-10 md:min-w-10 md:px-4 3xl:h-11 3xl:min-w-11`}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPage}
        onClick={() => setPage(currentPage + 1)}
        className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
      >
        <div className="relative size-5 -rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
          <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
        </div>
      </button>
    </div>
  );
};

export default ThePagination;

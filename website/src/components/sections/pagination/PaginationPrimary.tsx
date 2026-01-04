'use client';
import React, { useCallback, useMemo } from 'react';
import NextImg from '../../common/next-img';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleScrollTo } from '@/src/utils/gsap';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { getPaginatedPages } from '@/src/utils/pagination';

type PaginationPrimaryProps = {
  currentPage: number;
  totalPage: number;
  idSection: string;
  pageName?: string;
};

export default function PaginationPrimary({
  currentPage,
  totalPage,
  idSection,
  pageName = "page"
}: PaginationPrimaryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { conditions } = useGsapMatchMedia();

  const pagination = useMemo(
    () => getPaginatedPages(totalPage, currentPage),
    [totalPage, currentPage],
  );

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      params.set(pageName, pageNumber.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleClick = useCallback(
    (pageNumber: number) => {
      handleChangePage(pageNumber);
      handleScrollTo(idSection, conditions);
    },
    [handleChangePage],
  );

  if (totalPage <= 1) return null;
  return (
    <div className="col-span-full flex items-center justify-center gap-[2px] md:gap-1">
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
      >
        <div className="relative size-5 rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
          <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
        </div>
      </button>

      {pagination &&
        pagination?.map((item: any, index: any) => (
          <button
            onClick={
              typeof item === 'number' ? () => handleClick(item) : undefined
            }
            key={`${item}-${index}`}
            className={`${currentPage === item ? 'bg-primary-600 text-white' : 'bg-white text-[#71717A]'} ${item === '...' ? 'pointer-events-none cursor-default' : 'cursor-pointer'} relative h-9 min-w-9 rounded-[6px] px-3 text-center text-lg font-medium transition-all duration-100 hover:bg-primary-300 hover:text-white md:h-10 md:min-w-10 md:px-4 3xl:h-11 3xl:min-w-11`}
          >
            {item}
          </button>
        ))}

      <button
        disabled={currentPage === totalPage}
        onClick={() => handleClick(currentPage + 1)}
        className="group relative flex size-9 cursor-pointer items-center justify-center rounded-[6px] bg-white transition-all duration-100 hover:bg-primary-600 disabled:hover:cursor-default md:size-10 3xl:size-11"
      >
        <div className="relative size-5 -rotate-90 transition-all duration-100 group-hover:brightness-0 group-hover:invert">
          <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
        </div>
      </button>
    </div>
  );
}

'use client';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { CommonSection } from '@/src/types/pageBuilder';
import { handleScrollTo } from '@/src/utils/gsap';
import { getAssetUrlById } from '@/src/utils/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function HeroTextOverlay({ data }: CommonSection) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { conditions } = useGsapMatchMedia();

  const searchText = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(searchText);

  const updateQueryParams = (params: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const query = current.toString();
    router.push(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
    handleScrollTo('search_results', conditions);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams({
      q: inputValue.toUpperCase(),
      page: '1',
    });
  };

  return (
    <div className="md:relative bg-primary-50">
      <div
        className="flex h-full flex-col items-center gap-1 py-40 text-center md:py-[100px] lg:gap-2 lg:py-[120px] 2xl:gap-4 2xl:py-[140px] 3xl:py-40"
        style={{
          background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${getAssetUrlById(data?.cover?.id)}") lightgray 50% / cover no-repeat`,
        }}
      >
        <h1 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
          {data?.title}
        </h1>
        <p className="text-base font-normal text-gray-200 md:text-lg lg:text-xl">
          {data?.subtitle}
        </p>
      </div>

      {/* Search form */}
      <div className="mx-auto w-full max-w-[320px] -translate-y-1/2 bg-transparent md:bottom-0 md:max-w-[600px] md:px-0 md:py-0 lg:max-w-[800px] xl:max-w-[1000px]">
        <form
          className="flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
          onSubmit={handleSearch}
        >
          <div className="flex flex-1 flex-col text-start">
            <label
              htmlFor="searchText"
              className="text-sm font-normal text-gray-500 lg:text-base"
            >
              {data?.blurb}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder={data?.contents}
              className="text-base font-normal placeholder:text-[#0F2F64] focus:border-none focus:outline-none md:text-lg"
            />
          </div>
          <button
            type="submit"
            className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
          >
            <span className="hidden md:block">{data?.buttons?.[0]?.title}</span>
            <img src="/assets/icons/arrow_right_white.svg" alt="arrow right" />
          </button>
        </form>
      </div>
    </div>
  );
}

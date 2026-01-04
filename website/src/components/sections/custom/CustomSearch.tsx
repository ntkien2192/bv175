'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import NextImg from '../../common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchListContent from './SearchListContent';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '@/src/lib/utils';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';

export default function CustomSearch({ data }: CommonSection) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const subnet = searchParams.get('subnet');
  const keyword = searchParams.get('s') || '';

  const [searchText, setSearchText] = useState<string>(keyword);
  const [totalAll, setTotalAll] = useState<number>(0);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      // Cập nhật giá trị param
      if (value && value.trim() !== '') {
        params.set(key, value.trim());
      } else {
        // Nếu không có → xoá param
        params.delete(key);
      }
      // Xoá toàn bộ các tham số phân trang
      Array.from(params.keys()).forEach((k) => {
        if (k.startsWith('page-')) params.delete(k);
      });
      router.push(`?${params.toString()}`, { scroll: true });
    },
    [router, searchParams],
  );

  useEffect(() => {
    setTotalAll(0);
    setSearchText(keyword);
  }, [keyword, subnet]);

  const debouncedUpdateParam = useMemo(
    () => debounce(updateParam, 500, { leading: true, trailing: false }),
    [updateParam],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateParam.cancel();
    };
  }, [debouncedUpdateParam]);

  return (
    <section className="py-8 lg:container lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="relative flex flex-col gap-5 lg:grid lg:grid-cols-[auto,180px] lg:gap-6 xl:gap-7 2xl:gap-8 3xl:grid-cols-[auto,200px] 3xl:gap-10">
        <div className="space-y-3 md:space-y-4 xl:space-y-6 3xl:space-y-7 4xl:space-y-8">
          {data?.title && (
            <h1 className="section-title px-6 text-primary-600 md:px-[calc((100vw-688px)/2)] lg:px-0">
              {data?.title}
            </h1>
          )}

          <div className="relative mx-6 flex items-center gap-2 rounded-[6px] bg-gray-100 px-2 shadow-md md:mx-[calc((100vw-688px)/2)] lg:mx-0 lg:px-3">
            <button
              onClick={() => {
                debouncedUpdateParam('s', searchText);
              }}
              className="relative size-5"
            >
              <NextImg src="/assets/icons/search_gray.svg" alt="search_gray" />
            </button>

            <input
              ref={inputRef}
              type="text"
              id="search"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 border-none bg-transparent bg-none py-2.5 text-base text-gray-950 outline-none placeholder:text-gray-500 lg:py-3 lg:text-base"
              placeholder={t('Validate.search.placeholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  debouncedUpdateParam('s', searchText);
                }
              }}
            />

            <button
              onClick={() => {
                setSearchText('');
                inputRef.current?.focus();
              }}
              className={`${searchText === '' ? 'pointer-events-none opacity-0' : ''} flex size-7 items-center justify-center brightness-0`}
            >
              <div className="relative size-4">
                <NextImg src="/assets/icons/close.svg" alt="close icon" />
              </div>
            </button>
          </div>

          <div className="relative w-full lg:hidden">
            <Swiper
              touchEventsTarget="container"
              grabCursor={true}
              slidesPerView="auto"
              loop={false}
              spaceBetween={20}
              breakpoints={{
                768: {
                  spaceBetween: 24,
                },
              }}
              speed={600}
              className="!px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
            >
              <SwiperSlide key={99} className="!w-fit">
                <div
                  onClick={() => {
                    debouncedUpdateParam('subnet', '');
                  }}
                  className={cn(
                    'block cursor-pointer py-2.5 text-base font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base',
                    !subnet && 'text-primary-600',
                  )}
                >
                  {t('Common.all')}
                </div>
              </SwiperSlide>

              {data?.buttons?.map((button: any, index: number) => (
                <SwiperSlide key={index} className="!w-fit">
                  <div
                    onClick={() => {
                      debouncedUpdateParam('subnet', button?.icon?.collection);
                    }}
                    className={cn(
                      'block cursor-pointer py-2.5 text-base font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base',
                      subnet === button?.icon?.collection && 'text-primary-600',
                    )}
                  >
                    {button?.title}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="px-6 md:px-[calc((100vw-688px)/2)]">
              <div className="h-[1px] w-full bg-gray-200"></div>
            </div>
          </div>

          <div className="px-6 text-base md:px-[calc((100vw-688px)/2)] lg:px-0 xl:text-lg 3xl:text-xl 4xl:text-2xl">
            {`${totalAll} ${t('Common.search-results')}`}
          </div>

          <div className="w-full space-y-10 px-6 md:px-[calc((100vw-688px)/2)] lg:space-y-12 lg:px-0 xl:space-y-14">
            {data?.buttons?.map((button: any, index: number) => {
              const collection = button?.icon?.collection;
              const limit = button?.icon?.limit;
              const cardType = button?.icon?.card_type;
              const col = button?.icon?.col;

              if (subnet && subnet !== collection) return null;
              return (
                <SearchListContent
                  key={index}
                  collection={collection}
                  title={button?.title}
                  type={button?.blurb}
                  limit={limit}
                  url={button?.url}
                  setTotalAll={setTotalAll}
                  cardType={cardType}
                  className={cn('gap-4', {
                    'grid-cols-1 lg:gap-5 xl:grid-cols-1 2xl:gap-6 3xl:gap-7':
                      col === 1,
                    'grid-cols-1 md:grid-cols-2 lg:gap-5 2xl:gap-5 3xl:gap-6':
                      col === 2,
                    'grid-cols-1 md:grid-cols-2 md:gap-5 xl:grid-cols-3 3xl:gap-6':
                      col === 3,
                    'grid-cols-2 md:grid-cols-4 md:gap-4 2xl:gap-5 3xl:gap-6':
                      col === 4,
                  })}
                />
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="relative hidden lg:block">
          <div className="sticky top-[100px] xl:top-[160px] 2xl:top-[180px] 4xl:top-[200px]">
            <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-3 lg:text-lg 3xl:mb-4">
              {data?.subtitle}
            </h3>

            <div
              onClick={() => {
                debouncedUpdateParam('subnet', '');
              }}
              className={cn(
                'block cursor-pointer border-b border-gray-200 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-2.5 lg:text-base',
                !subnet && 'text-primary-600',
              )}
            >
              {t('Common.all')}
            </div>
            {data?.buttons?.map((button: any, index: number) => (
              <div
                onClick={() => {
                  debouncedUpdateParam('subnet', button?.icon?.collection);
                }}
                key={index}
                className={cn(
                  'block cursor-pointer border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary-600 lg:py-3 lg:text-base',
                  subnet === button?.icon?.collection && 'text-primary-600',
                )}
              >
                {button?.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

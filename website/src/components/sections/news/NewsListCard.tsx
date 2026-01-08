'use client';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import NewsCard from './NewsCard';
import { getListNews, getTotalNewsCount } from '@/src/services/news';
import { CommonSection } from '@/src/types/pageBuilder';
import { useParams, useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PaginationPrimary from '../pagination/PaginationPrimary';
import { useLocale, useTranslations } from 'next-intl';

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

export default function NewsListCard({ data }: CommonSection) {
  const t = useTranslations('Common');
  const locale = useLocale();
  // Animation
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);

  const searchParams = useSearchParams();
  const params = useParams() || {};

  const [dataNews, setDataNews] = useState<any>([]);
  const [length, setLength] = useState<number>(0);

  // Bộ lọc
  const category = (params?.cate as string) ?? data?.custom?.category ?? '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('s');
  const isSort: boolean = data?.collection_items_order === '-date_published';

  // Phân trang
  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  useGSAP(
    () => {
      gsap.to(selector('.news-card'), {
        scale: 0.9,
        opacity: 0,
        stagger: {
          each: 0.1,
          grid: 'auto',
        },
        duration: 0.3,
        onStart: () => {
          fetchData();
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [data, currentPage, category, search],
    },
  );

  async function fetchData() {
    try {
      const response = await getListNews({
        collection: data?.collections,
        page: currentPage,
        limit: data?.collection_items_limit,
        sort: isSort,
        category: category || '',
        keyword: search || '',
        offset: 1,
        locale
      });
      setDataNews(response);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      ScrollTrigger.refresh();
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalNewsCount({
          collection: data?.collections,
          category: category || '',
          keyword: search || '',
          locale
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        ScrollTrigger.refresh();
      }
    })();
  }, [data, category, search]);

  useGSAP(
    () => {
      if (!dataNews) return;
      ScrollTrigger.batch(selector('.news-card'), {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            stagger: {
              each: 0.05,
              grid: 'auto',
              ease: 'power1.out',
            },
            duration: 0.7,
          });
        },
      });
    },
    { scope: containerRef, dependencies: [dataNews] },
  );

  return (
    <section ref={containerRef}>
      <div
        id="news-list"
        className="p-[24px_0_44px] lg:p-[28px_0_52px] xl:p-[32px_0_64px] 3xl:p-[32px_0_72px] 4xl:p-[40px_0_80px]"
      >
        <div className="container space-y-8 lg:space-y-10 xl:space-y-12 3xl:space-y-[52px] 4xl:space-y-[60px]">
          {data?.title && (
            <h2
              className="section-title text-primary-950"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          )}

          {dataNews?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 4xl:gap-10">
              {dataNews?.map((item: any, index: number) => (
                <div
                  key={item?.slug ?? index}
                  className="news-card col-span-1 origin-center scale-[0.9] opacity-0"
                >
                  <NewsCard
                    item={item}
                    url={data?.buttons?.[0]?.url}
                    cateUrl={category}
                  />
                </div>
              ))}

              <PaginationPrimary
                currentPage={currentPage}
                totalPage={totalPage}
                idSection="news-list"
              />
            </div>
          ) : (
            <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-sm font-medium text-black lg:text-base xl:text-lg">
              {t('no-data')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PaginationPrimary from '../pagination/PaginationPrimary';
import { useSearchParams } from 'next/navigation';
import {
  fnGetAdminDepartments,
  getTotalAdminDepartmentCount,
} from '@/src/services/adminDepartment';
import { CommonSection } from '@/src/types/pageBuilder';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import DepartmentCard from '../../departments/DepartmentCard';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

export default function Card4Col({ data }: CommonSection) {
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);

  const t = useTranslations('Common');
  const searchParams = useSearchParams();

  const [adminDepartData, setAdminDepartData] = useState<any>([]);
  const [length, setLength] = useState<number>(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  async function fetchData() {
    try {
      const response = await fnGetAdminDepartments({
        collection: data?.collections,
        page: currentPage,
        limit: data?.collection_items_limit,
      });
      setAdminDepartData(response);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useGSAP(
    () => {
      gsap.to(selector('.admin-depart-card'), {
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
      dependencies: [data, currentPage],
    },
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalAdminDepartmentCount({
          collection: data?.collections,
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, [data]);

  useGSAP(
    () => {
      if (!adminDepartData) return;
      ScrollTrigger.batch(selector('.admin-depart-card'), {
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
    { scope: containerRef, dependencies: [adminDepartData] },
  );

  return (
    <section ref={containerRef}>
      <div
        id="admin-depart-list"
        className="p-[40px_0] lg:p-[40px_0] xl:p-[48px_0] 2xl:p-[52px_0] 3xl:p-[56px_0] 4xl:p-[64px_0]"
      >
        <div className="container">
          {adminDepartData?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-5 3xl:gap-6 4xl:gap-8">
              {adminDepartData?.map((item: any, index: number) => (
                <div
                  key={item?.slug ?? index}
                  className="admin-depart-card col-span-1 origin-center scale-[0.9] opacity-0"
                >
                  <DepartmentCard
                    item={item}
                    url={data?.buttons?.[0]?.url}
                    blurb="description"
                  />
                </div>
              ))}

              <PaginationPrimary
                currentPage={currentPage}
                totalPage={totalPage}
                idSection="admin-depart-list"
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

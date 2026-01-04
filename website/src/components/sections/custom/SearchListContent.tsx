'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getListDoctorPreview,
  getTotalDoctorCount,
} from '@/src/services/doctors';
import { getListNews, getTotalNewsCount } from '@/src/services/news';
import {
  fnGetAdminDepartments,
  getTotalAdminDepartmentCount,
} from '@/src/services/adminDepartment';
import { NewsCard } from '../news';
import DoctorCard from '../../common/doctor-card';
import PaginationPrimary from '../pagination/PaginationPrimary';
import DepartmentCard from '../../departments/DepartmentCard';
import { cn } from '@/src/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';
gsap.registerPlugin(useGSAP, ScrollTrigger);

type SearchListContentProps = {
  collection: any;
  type: string;
  limit?: number;
  url?: string;
  title?: string;
  setTotalAll: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  cardType?: string;
};

export default function SearchListContent({
  collection,
  type,
  limit = 6,
  url = '/',
  title = '',
  setTotalAll,
  className,
  cardType = 'search',
}: SearchListContentProps) {
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);

  const t = useTranslations('Common');
  const searchParams = useSearchParams();

  const [data, setData] = useState<any>([]);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // lấy các thông tin search
  const pageParam = `page-${type}`;
  const currentPage = Number(searchParams.get(pageParam) || 1);
  const keyword = searchParams.get('s') || '';
  const subnet = searchParams.get('subnet') || '';

  // Map component, hàm gọi api và total, props card theo collection
  const cardRegistry: Record<
    string,
    {
      Component: React.ComponentType<any>;
      getList: (params: any) => Promise<any>;
      getCount: (params: any) => Promise<number>;
      getProps: (item: any) => Record<string, any>;
    }
  > = {
    posts: {
      Component: NewsCard,
      getList: getListNews,
      getCount: getTotalNewsCount,
      getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    },
    // activity_posts: {
    //   Component: NewsCard,
    //   getList: getListNews,
    //   getCount: getTotalNewsCount,
    //   getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    // },
    // for_patient_posts: {
    //   Component: NewsCard,
    //   getList: getListNews,
    //   getCount: getTotalNewsCount,
    //   getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    // },
    doctors: {
      Component: DoctorCard,
      getList: getListDoctorPreview,
      getCount: getTotalDoctorCount,
      getProps: (itemData) => ({
        item: itemData,
        url,
        avatarType: 'avatar',
        type: cardType,
      }),
    },
    departments: {
      Component: DepartmentCard,
      getList: fnGetAdminDepartments,
      getCount: getTotalAdminDepartmentCount,
      getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    },
    administration_departments: {
      Component: DepartmentCard,
      getList: fnGetAdminDepartments,
      getCount: getTotalAdminDepartmentCount,
      getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    },
    department_groups: {
      Component: DepartmentCard,
      getList: fnGetAdminDepartments,
      getCount: getTotalAdminDepartmentCount,
      getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    },
    dependent_units: {
      Component: DepartmentCard,
      getList: fnGetAdminDepartments,
      getCount: getTotalAdminDepartmentCount,
      getProps: (itemData) => ({ item: itemData, url, type: cardType }),
    },
  };

  const registry = cardRegistry[collection];
  const CardComponent = registry?.Component;

  const totalPage: number = useMemo(
    () => (length ? Math.ceil(length / limit) : 0),
    [length, limit],
  );

  // gọi danh sách
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await registry.getList({
        collection,
        keyword,
        limit,
        page: currentPage,
      });
      setData(response || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setData([]);
    } finally {
      setLoading(false);
      ScrollTrigger.refresh();
    }
  };

  useGSAP(
    () => {
      if (!registry) return;
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
      dependencies: [keyword, currentPage, subnet, type],
    },
  );

  // gọi total
  useEffect(() => {
    if (!registry) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await registry.getCount({ collection, keyword });

        setLength(response || 0);
        setTotalAll((prev: number) => prev + Number(response || 0));
      } catch (error) {
        console.error('Fetch error:', error);
        setLength(0);
        setTotalAll((prev: number) => prev + 0);
      } finally {
        setLoading(false);
        ScrollTrigger.refresh();
      }
    };

    fetchData();
  }, [keyword, subnet, type]);

  useGSAP(
    () => {
      if (!data) return;
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
    { scope: containerRef, dependencies: [data] },
  );

  if (data?.length === 0) return null;

  return (
    <div ref={containerRef}>
      <div
        id={collection}
        className="space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-7 4xl:space-y-8"
      >
        <h1 className="text-[24px] font-semibold text-primary-600 md:text-[26px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]">
          {title}
        </h1>

        {CardComponent && data?.length > 0 ? (
          <>
            <div className={cn('grid', className)}>
              {data?.map((el: any, i: number) => (
                <div
                  key={i}
                  className={`admin-depart-card col-span-1 scale-[0.9] opacity-0 ${cardType === 'search' ? 'origin-left' : 'origin-center'}`}
                >
                  <CardComponent key={i} {...registry.getProps(el)} />
                </div>
              ))}
            </div>
            {totalPage > 1 && (
              <div className="pt-2">
                <PaginationPrimary
                  currentPage={currentPage}
                  totalPage={totalPage}
                  idSection={collection}
                  pageName={pageParam}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-normal flex h-[calc(100vh/3)] items-center justify-center text-sm font-medium text-black lg:text-base xl:text-lg">
            {t('no-data')}
          </div>
        )}
      </div>
    </div>
  );
}

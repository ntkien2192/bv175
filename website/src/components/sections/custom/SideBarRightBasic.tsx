'use client';
import { fnGetListitem } from '@/src/services/common';
import { CommonSection } from '@/src/types/pageBuilder';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import CustomLink from '../../common/custom-link';
// import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { getPositionFixed } from '@/src/utils/gsap';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';

// gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SideBarRightBasic({ data }: CommonSection) {
  const [cateData, setCateData] = useState<any>([]);
  const sidebarRef = useRef<HTMLDivElement>(null!);
  const [hasSidebarContainer, setHasSidebarContainer] = useState(false);
  // const containerRef = useRef<any>(null);
  // const { conditions } = useGsapMatchMedia();

  useEffect(() => {
    if (!data.collections) return;
    (async () => {
      try {
        const response = await fnGetListitem({
          collection: data?.collections,
          limit: data?.collection_items_limit,
        });
        setCateData(response);
      } catch (error) {
        console.log('Error fetching data' + error);
      } finally {
        // ScrollTrigger.refresh();
      }
    })();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sidebarContainer = document.querySelector('.sidebar-container');
    const sidebarEl = sidebarRef.current;

    if (!sidebarEl) return;

    if (sidebarContainer && !sidebarContainer.contains(sidebarEl)) {
      try {
        sidebarContainer.appendChild(sidebarEl);
        setHasSidebarContainer(true);
      } catch (err) {
        console.error('Sidebar append error:', err);
        setHasSidebarContainer(false);
      }
    } else {
      setHasSidebarContainer(!!sidebarContainer);
    }

    return () => {
      if (sidebarContainer && sidebarContainer.contains(sidebarEl)) {
        sidebarContainer.removeChild(sidebarEl);
      }
    };
  }, [cateData]);

  // useGSAP(
  //   () => {
  //     if (!containerRef.current || !sidebarRef.current || !conditions) return;

  //     const sidebarContainer = document.querySelector(
  //       '.sidebar-container',
  //     ) as HTMLElement | null;

  //     if (sidebarContainer && sidebarRef.current) {
  //       if (!sidebarContainer.contains(sidebarRef.current)) {
  //         sidebarContainer.appendChild(sidebarRef.current);
  //       }
  //       setHasSidebarContainer(true);
  //     } else {
  //       setHasSidebarContainer(false);
  //     }

  //     const mm = gsap.matchMedia();

  //     mm.add('(min-width: 768px)', () => {
  //       ScrollTrigger.create({
  //         trigger: sidebarRef.current,
  //         start: () => getPositionFixed(conditions),
  //         endTrigger: sidebarContainer,
  //         end: () =>
  //           `+=${(sidebarContainer?.offsetHeight ?? 0) - (sidebarRef.current?.offsetHeight ?? 0)}`,
  //         // end: 'max',
  //         pin: true,
  //         pinSpacing: false,
  //         pinnedContainer: sidebarContainer,
  //       });
  //     });
  //   },
  //   {
  //     scope: containerRef,
  //     dependencies: [conditions, cateData],
  //   },
  // );

  return (
    <section>
      <div
        ref={sidebarRef}
        className="h-fit w-full md:sticky md:top-[100px] lg:top-[120px] xl:top-[170px] 2xl:top-[190px] 3xl:top-[200px] 4xl:top-[220px]"
        // className="h-fit w-full"
      >
        {/*  Tags  */}
        {hasSidebarContainer && (
          <>
            <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
              {data?.title}
            </h3>

            {cateData?.map((cate: any, index: number) => (
              <CustomLink
                href={`${data?.buttons?.[0]?.url}/${cate?.slug}`}
                key={cate?.slug || index}
                className="block border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 last:border-transparent hover:text-primary-600 lg:py-3 lg:text-base"
              >
                {cate?.title}
              </CustomLink>
            ))}

            {cateData?.length === 0 &&
              data?.buttons?.map((item: any, index: number) => (
                <CustomLink
                  href={item?.url}
                  key={index}
                  className="block border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 last:border-transparent hover:text-primary-600 lg:py-3 lg:text-base"
                >
                  {item?.title}
                </CustomLink>
              ))}
          </>
        )}
      </div>
    </section>
    // <div ref={containerRef}>
    // </div>
  );
}

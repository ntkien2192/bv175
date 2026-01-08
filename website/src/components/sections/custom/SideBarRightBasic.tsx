'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useRef, useState } from 'react';
import CustomLink from '../../common/custom-link';

export default function SideBarRightBasic({ data }: CommonSection) {
  const sidebarRef = useRef<HTMLDivElement>(null!);
  const [hasSidebarContainer, setHasSidebarContainer] = useState(false);

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
  }, []);

  return (
    <section>
      <div
        ref={sidebarRef}
        className="h-fit w-full md:sticky md:top-[100px] lg:top-[120px] xl:top-[170px] 2xl:top-[190px] 3xl:top-[200px] 4xl:top-[220px]"
      >
        {/*  Tags  */}
        {hasSidebarContainer && (
          <>
            <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
              {data?.title}
            </h3>

            {data?.buttons?.map((item: any, index: number) => (
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
  );
}

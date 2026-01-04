'use client';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { fnGetListitem } from '@/src/services/common';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useParams } from 'next/navigation';
import CustomLink from '../../common/custom-link';

export default function BreadcrumbBasic({ data }: CommonSection) {
  const [buttons, setButtons] = useState<any[]>(data?.buttons);
  const param = useParams() || {};
  const category = (param?.cate as string) || ''; // danh mục tin tức

  useEffect(() => {
    if (!data?.collections) return;

    (async () => {
      try {
        const response = await fnGetListitem({ collection: data.collections });

        if (Array.isArray(response)) {
          // Nếu có category => thêm slug vào
          if (category) {
            const matchedItem = response.find(
              (item: any) => item.slug === category,
            );

            if (matchedItem) {
              const updatedButtons = buttons.map((btn: any) => {
                if (btn?.url === '/' || btn?.url === '') return btn;

                if (btn?.url?.endsWith('/')) {
                  return {
                    ...btn,
                    url: `${btn.url}${matchedItem.slug}`,
                    title: matchedItem.title,
                  };
                }
                return btn;
              });
              setButtons(updatedButtons);
            }
          } else {
            const cleanedButtons = buttons.filter(
              (btn: any) => !btn?.url?.endsWith('/') || btn?.url === '/',
            );
            setButtons(cleanedButtons);
          }
        }
      } catch (error) {
        console.log('Error fetching data: ' + error);
      } finally {
        ScrollTrigger.refresh();
      }
    })();
  }, [data?.collections, category]);

  return (
    <div className="bg-primary-50">
      <div className="container flex flex-wrap items-center gap-1 py-2 text-sm md:text-base lg:gap-1.5 lg:py-2 lg:text-lg xl:py-2.5 4xl:gap-2 4xl:py-3 4xl:text-xl">
        {buttons?.map((button: any, index: number) => {
          const isLast = index === buttons.length - 1;

          return (
            <React.Fragment key={index}>
              {button?.url ? (
                <CustomLink
                  href={`${button?.url}` || '/'}
                  aria-label="Chuyển trang"
                  className={`${isLast ? 'font-semibold text-primary-600' : 'font-normal text-[#71717A] hover:text-primary-600'} block transition-colors duration-100`}
                >
                  {button?.title}
                </CustomLink>
              ) : (
                <div
                  className={`${isLast ? 'font-semibold text-primary-600' : 'font-normal text-[#71717A] hover:text-primary-600'} block transition-colors duration-100`}
                >
                  {button?.title}
                </div>
              )}

              {!isLast && (
                <div className="relative size-4 -rotate-90 xl:size-5">
                  <NextImg
                    src="/assets/icons/arrow_down_gray.svg"
                    alt="arrow icon"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

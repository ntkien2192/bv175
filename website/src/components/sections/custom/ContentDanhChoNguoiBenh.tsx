'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect } from 'react';
import CustomLink from '../../common/custom-link';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import NextImg from '../../common/next-img';
import Fancybox from '../../common/Fancybox';

export default function ContentCongDichVuCong({ data }: CommonSection) {
  const button = data?.buttons?.[0];

  useEffect(() => {
    const container = document.querySelector(
      '.content-wrapper.content-fancybox',
    );
    if (!container) return;

    try {
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        if (img && !img.hasAttribute('data-fancybox')) {
          img.setAttribute('data-fancybox', 'gallery');
          img.setAttribute('data-src', img.getAttribute('src') || '');
          img.style.cursor = 'pointer';
        }
      });
    } catch (err) {
      console.error('Fancybox setup error:', err);
    }
  }, [data?.contents]);

  return (
    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:px-[160px]">
        <div className="space-y-8">
          {data?.title && (
            <h1 className="text-[24px] font-bold text-primary-600 md:text-[28px] xl:text-[32px] 4xl:text-[32px]">
              {data?.title}
            </h1>
          )}

          {data?.blurb && (
            <div
              className="section-content mx-auto mb-6 w-full text-justify lg:mb-8 2xl:mb-10"
              dangerouslySetInnerHTML={{
                __html: data?.blurb as string,
              }}
            ></div>
          )}

          {button && (
            <CustomLink
              href={button.url}
              className="flex h-[50px] w-fit items-center justify-center rounded-md bg-primary-700 px-[20px] text-center text-[16px] font-bold text-white md:px-[40px] md:text-[18px] xl:px-[50px] xl:text-[20px]"
            >
              {button.title}
            </CustomLink>
          )}

          <Fancybox
            options={{
              Carousel: {
                infinite: true,
              },
              Images: {
                zoom: true,
              },
            }}
          >
            <div
              className="content-wrapper content-fancybox [&_ul]:ml-2 [&_ul_ul]:ml-4"
              dangerouslySetInnerHTML={{
                __html: data?.contents,
              }}
            ></div>
          </Fancybox>

          {data?.items?.length > 0 && (
            <Accordion.Root
              className="w-full space-y-6 xl:space-y-8"
              type="multiple"
            >
              {data?.items?.map((item: any, index: number) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="group pb-0"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-2 rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:gap-3 xl:p-4 3xl:gap-4 3xl:p-5">
                    <div
                      className="flex-1 text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl"
                      dangerouslySetInnerHTML={{
                        __html: item?.title,
                      }}
                    ></div>

                    <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                      <NextImg
                        src="/assets/icons/chevron_up_accordion.svg"
                        alt="chevron_up_accordion"
                      />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {/* content laptop */}
                    <div
                      className="hidden w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:block md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc"
                      dangerouslySetInnerHTML={{
                        __html: item?.content?.contents?.[0],
                      }}
                    ></div>

                    {/* content mobile */}
                    <div
                      className="w-full space-y-1 pt-3 text-sm font-normal text-[#09090B] md:hidden md:space-y-2 lg:pt-3 lg:text-base xl:space-y-3 [&>ul]:list-inside [&>ul]:list-disc"
                      dangerouslySetInnerHTML={{
                        __html: item?.content?.contents?.[1],
                      }}
                    ></div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion.Root>
          )}
        </div>
        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}

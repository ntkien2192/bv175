'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import NextImg from '../../common/next-img';
import { handleScrollTo } from '@/src/utils/gsap';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';

export default function FaqsDetailSplit({ data }: CommonSection) {
  const { conditions } = useGsapMatchMedia();

  return (
    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:px-[160px]">
        <div className="space-y-3 lg:space-y-4">
          {data?.title && (
            <h1 className="text-[24px] font-bold text-primary-600 md:text-[28px] xl:text-[32px] 4xl:text-[32px]">
              {data?.title}
            </h1>
          )}

          <div
            className="section-content mx-auto mb-6 w-full text-justify lg:mb-8 2xl:mb-10"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>

          {data?.buttons?.length > 0 && (
            <Accordion.Root
              className="w-full space-y-6 xl:space-y-8"
              type="multiple"
            >
              {data?.buttons?.map((item: any, index: number) => (
                <AccordionItem
                  id={`faq-${index + 1}`}
                  value={`item-${index}`}
                  key={index}
                  className="group pb-0"
                >
                  <AccordionTrigger className="w-full">
                    <div
                      onClick={() =>
                        handleScrollTo(`faq-${index + 1}`, conditions)
                      }
                      className="content-wrapper w-full [&_ul]:ml-2 [&_ul_ul]:ml-4"
                      dangerouslySetInnerHTML={{
                        __html: item?.title,
                      }}
                    ></div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div
                      className="content-wrapper pt-2 lg:pt-3 2xl:pt-4 [&_ul]:ml-2 [&_ul_ul]:ml-4"
                      dangerouslySetInnerHTML={{
                        __html: item?.blurb,
                      }}
                    ></div>
                  </AccordionContent>
                  <div className="flex justify-center pt-2 md:pt-3 xl:pt-4 2xl:pt-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-1 text-sm font-medium text-[#E50000] md:text-base xl:gap-[6px] xl:text-lg 3xl:text-xl">
                        <span className="group-data-[state=open]:hidden">
                          {data?.contents?.contents?.[0]}
                        </span>
                        <span
                          onClick={() =>
                            handleScrollTo(`faq-${index + 1}`, conditions)
                          }
                          className="hidden group-data-[state=open]:block"
                        >
                          {data?.contents?.contents?.[1]}
                        </span>
                        <div className="relative size-5 transition-all duration-200 group-data-[state=open]:-rotate-180">
                          <NextImg
                            src="/assets/icons/arrow_down_red.svg"
                            alt="arrow_down_red.svg"
                          />
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
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

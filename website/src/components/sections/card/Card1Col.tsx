'use client';
import {
  getListMilestone,
  getTotalMilestoneCount,
} from '@/src/services/milestone';
import { CommonSection } from '@/src/types/pageBuilder';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import {
  TooltipProvider,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
  TooltipArrow,
} from '../../ui/tooltip';
import NextImg from '../../common/next-img';
import Card1ColDetail from './Card1ColDetail';
import PaginationPrimary from '../pagination/PaginationPrimary';
import { handleScrollTo } from '@/src/utils/gsap';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { useTranslations } from 'next-intl';

export default function Card1Col({ data }: CommonSection) {
  const t = useTranslations('Common');
  const searchParams = useSearchParams();
  const { conditions } = useGsapMatchMedia();

  const [milestoneData, setMilestoneData] = useState<any>([]);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage: number = useMemo(() => {
    return length
      ? Math.ceil(Number(length) / data?.collection_items_limit)
      : 0;
  }, [length, data?.collection_items_limit]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getListMilestone({
          collection: data?.collections,
          page: currentPage,
          limit: data?.collection_items_limit,
        });
        setMilestoneData(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [data, currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getTotalMilestoneCount({
          collection: data?.collections,
        });
        setLength(response);
      } catch (error) {
        console.log('Error:', error);
      }
    })();
  }, []);

  return (
    <div
      id="milestone-list"
      className="container space-y-10 py-14 md:space-y-12 lg:space-y-14 lg:py-16 xl:py-[60px] 2xl:space-y-16 2xl:py-[80px] 3xl:space-y-[72px] 3xl:py-[100px] 4xl:space-y-[80px] 4xl:py-[120px]"
    >
      {loading ? (
        <div className="flex h-10 items-center justify-center">
          <div className="relative size-8 animate-spin">
            <NextImg
              src="/assets/icons/loading_spin_primary.svg"
              alt="loading spin"
            />
          </div>
        </div>
      ) : (
        <>
          {milestoneData?.length > 0 && (
            <Accordion.Root
              className="w-full space-y-12 md:space-y-12 lg:space-y-14 2xl:space-y-16 2xl:pl-10 3xl:space-y-[72px] 4xl:space-y-[80px] 4xl:pl-0"
              type="multiple"
            >
              <TooltipProvider delayDuration={100}>
                {milestoneData?.map((item: any, index: number) => (
                  <div
                    id={`milestone-${item?.id}`}
                    key={index}
                    className="flex items-stretch gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-14 3xl:gap-16 4xl:gap-[80px]"
                  >
                    <div className="relative">
                      <TooltipRoot open={true} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="relative z-[2] size-5 rounded-full border-[6px] border-primary-400 bg-primary-50 lg:size-6 xl:size-7 3xl:size-8"></div>
                        </TooltipTrigger>

                        <div className="2xl:hidden">
                          <TooltipContent
                            side="top"
                            align="start"
                            sideOffset={8}
                            alignOffset={-6}
                            avoidCollisions={false}
                            asChild={false}
                            className="rounded-lg bg-primary-600 p-[6px_10px] text-sm font-semibold text-white lg:p-[6px_12px] lg:text-base"
                          >
                            {item?.year}
                            <TooltipArrow className="fill-primary-600" />
                          </TooltipContent>
                        </div>

                        <div className="hidden 2xl:block">
                          <TooltipContent
                            side="left"
                            align="center"
                            sideOffset={8}
                            avoidCollisions={false}
                            asChild={false}
                            className="rounded-lg bg-primary-600 text-sm font-semibold text-white lg:text-base 2xl:p-[6px_14px] 2xl:text-lg 3xl:p-[8px_16px]"
                          >
                            {item?.year}
                            <TooltipArrow className="fill-primary-600" />
                          </TooltipContent>
                        </div>
                      </TooltipRoot>

                      <div
                        className={`${milestoneData?.length - 1 === index ? 'bottom-0' : '-bottom-12 md:-bottom-12 lg:-bottom-14 2xl:-bottom-16 3xl:-bottom-[72px] 4xl:-bottom-[80px]'} absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-primary-400 md:w-1 xl:w-[6px] 3xl:w-2`}
                      ></div>
                    </div>

                    <div className="flex-1">
                      <AccordionItem
                        value={`page-${currentPage}-item-${index}`}
                        key={`page-${currentPage}-item-${index}`}
                        className="group w-full pb-0"
                      >
                        <AccordionTrigger className="w-full text-start">
                          <div
                            onClick={() =>
                              handleScrollTo(
                                `milestone-${item?.id}`,
                                conditions,
                              )
                            }
                          >
                            <div className="relative line-clamp-3 h-[84px] text-lg font-semibold uppercase text-primary-600 md:h-auto md:!leading-normal lg:text-xl 2xl:text-2xl 3xl:text-[28px]">
                              {item?.title}
                            </div>
                            <div
                              className="relative mt-1.5 line-clamp-3 h-[60px] overflow-hidden text-sm font-normal text-black lg:mt-2 xl:h-[72px] xl:text-base 2xl:mt-3 4xl:mt-4 [&_*]:!inline"
                              dangerouslySetInnerHTML={{
                                __html: item?.blurb,
                              }}
                            ></div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="w-full space-y-8 pt-6 md:space-y-6 md:pt-8 lg:space-y-8 xl:space-y-10 xl:pt-10 2xl:space-y-12 2xl:pt-12 3xl:space-y-14 3xl:pt-14 4xl:space-y-16 4xl:pt-16">
                            {item?.events?.map(
                              (event: any, eventIndex: number) => (
                                <Card1ColDetail
                                  key={eventIndex}
                                  event={event}
                                  data={data}
                                />
                              ),
                            )}
                          </div>
                        </AccordionContent>

                        <div className="flex justify-center pt-3 md:pt-4 xl:pt-5 2xl:pt-6">
                          <AccordionTrigger>
                            <div
                              onClick={() =>
                                handleScrollTo(
                                  `milestone-${item?.id}`,
                                  conditions,
                                )
                              }
                              className="flex items-center gap-1 text-sm font-medium text-black md:text-base xl:gap-[6px] xl:text-lg 3xl:text-xl"
                            >
                              <span className="group-data-[state=open]:hidden">
                                {t('expand')}
                              </span>
                              <span className="hidden group-data-[state=open]:block">
                                {t('collapse')}
                              </span>
                              <div className="relative size-5 transition-all duration-200 group-data-[state=open]:-rotate-180">
                                <NextImg
                                  src="/assets/icons/arrow_down_black.svg"
                                  alt="arrow_down_black.svg"
                                />
                              </div>
                            </div>
                          </AccordionTrigger>
                        </div>
                      </AccordionItem>
                    </div>
                  </div>
                ))}
              </TooltipProvider>
            </Accordion.Root>
          )}
        </>
      )}

      <PaginationPrimary
        currentPage={currentPage}
        totalPage={totalPage}
        idSection="milestone-list"
      />
    </div>
  );
}

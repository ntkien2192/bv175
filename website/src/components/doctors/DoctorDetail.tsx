'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useState } from 'react';
import NextImg from '../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '../ui/accordion';
import { getDoctorTitles } from '@/src/utils/render-doctor-title';
import { _Translator, useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';

export default function DoctorDetail({ data, dataDetail }: CommonSection) {
  const t = useTranslations('Doctor');
  const units = getWorkUnits(dataDetail);

  const dataContent = [
    {
      title: t('training_process'),
      content: dataDetail?.education_training || t('updating'),
    },
    {
      title: t('work_experience'),
      content: dataDetail?.work_experience || t('updating'),
    },
    {
      title: t('awards'),
      content: dataDetail?.award_and_honors || t('updating'),
    },
    {
      title: t('member_of_the_organization'),
      content: dataDetail?.memberships || t('updating'),
    },
    {
      title: t('books_newspapers_research_papers'),
      content: dataDetail?.research_works || t('updating'),
    },
  ];

  const filteredItems = dataContent.filter(
    (item) =>
      item?.content && item.content.replace(/<[^>]*>/g, '').trim() !== '',
  );

  return (
    <div className="bg-primary-50 py-6 md:py-10">
      <div className="container grid grid-cols-11 gap-6 md:gap-[68px] lg:gap-8 xl:gap-10 3xl:gap-12 4xl:gap-14">
        <div className="col-span-full flex flex-col items-stretch gap-16 md:flex-row md:items-start md:gap-7 lg:col-span-4 lg:flex-col lg:items-stretch lg:gap-[72px]">
          <div className="relative aspect-[480/600] w-full bg-gray-200 md:basis-1/2 lg:basis-0">
            <NextImg
              src={getAssetUrlById(
                dataDetail?.avatar || dataDetail?.uniform_avatar,
              )}
              objectFit="contain"
              className="object-top"
              alt="doctor image"
            />

            <div className="absolute bottom-0 left-0 z-[1] w-full translate-y-[40px]">
              <div className="space-y-1 rounded-[8px] bg-primary-600 p-4 xl:p-[20px_24px]">
                <div className="text-base font-normal text-[#E4E4E7] xl:text-lg 3xl:text-xl">
                  {dataDetail?.full_title}
                </div>
                <div className="text-[22px] font-bold !leading-[1.3] text-[#F6FAF7] md:text-2xl xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px]">
                  {dataDetail?.full_name}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:basis-1/2 lg:basis-0 lg:space-y-3 xl:space-y-4">
            {/* <Link
              href={`#`}
              aria-label="Đặt lịch khám"
              className="btn-danger relative !mb-6 w-full justify-center py-3 md:!mb-7 lg:!mb-8 lg:py-4 lg:text-lg"
            >
              Đặt lịch khám
              <div className="relative size-4">
                <NextImg
                  src="/assets/icons/phone2_white.svg"
                  alt="phone icon"
                />
              </div>
            </Link> */}

            <>
              <div className="text-xl font-semibold text-primary-800 md:text-[22px] xl:text-2xl 2xl:text-[28px]">
                {t('bio')}
              </div>

              <div
                className={`space-y-2 text-sm font-normal text-[#09090B] *:text-justify lg:text-start lg:text-base xl:space-y-3`}
                dangerouslySetInnerHTML={{
                  __html: dataDetail?.bio || t('updating'),
                }}
              ></div>
            </>

            {/* <div
              className={`${isViewMore ? 'line-clamp-none' : 'line-clamp-[8] md:line-clamp-[16] lg:line-clamp-[8]'} space-y-2 text-justify text-sm font-normal text-[#09090B] lg:text-start lg:text-base xl:space-y-3`}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.bio,
              }}
            ></div>

            <button
              onClick={() => setIsViewMore((prev: boolean) => !prev)}
              className="text-sm font-normal text-[#09090B] underline underline-offset-4 xl:text-base"
            >
              {isViewMore ? 'Thu gọn' : 'Xem thêm'}
            </button> */}
          </div>
        </div>

        <div className="col-span-full lg:col-span-7">
          <div className="space-y-6 rounded-[6px] bg-white p-4 md:p-6 lg:p-6 xl:space-y-8 xl:p-8 3xl:p-10">
            <div className="space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8">
              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  {t('position')}
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {getDoctorTitles(dataDetail).join(', ')}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  {t('department')}
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {dataDetail?.specialty || t('updating')}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  {t('work_unit')}
                </div>

                <div className="flex flex-wrap gap-1 lg:gap-2">
                  {units.map((unit, index) => (
                    <React.Fragment key={index}>
                      <Link
                        href={unit?.slug}
                        aria-label="Xem chi tiết đơn vị"
                        className="inline-block text-sm font-normal text-[#09090B] underline underline-offset-2 lg:text-base"
                      >
                        {unit.title}
                        {index < units.length - 1 && ','}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="space-y-1 xl:space-y-2">
                <div className="text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                  {t('years_of_experience')}
                </div>
                <div className="text-sm font-normal text-[#09090B] lg:text-base">
                  {dataDetail?.year_of_experience || t('updating')}
                </div>
              </div>
            </div>

            <Accordion.Root
              className="w-full space-y-6 xl:space-y-8"
              type="multiple"
              defaultValue={filteredItems.map((_, index) => `item-${index}`)}
            >
              {filteredItems?.map((item: any, index: number) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="group pb-0"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-2 rounded-[6px] bg-primary-50 p-3 lg:p-[12px_16px] xl:gap-3 xl:p-4 3xl:gap-4 3xl:p-5">
                    <div className="flex-1 text-start text-base font-medium text-primary-800 lg:text-lg 2xl:text-xl">
                      {item?.title}
                    </div>

                    <div className="relative size-5 rotate-180 transition-all duration-200 group-data-[state=open]:rotate-0 lg:size-6">
                      <NextImg
                        src="/assets/icons/chevron_up_accordion.svg"
                        alt="chevron_up_accordion"
                      />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div
                      className="w-full space-y-1 px-3 pt-3 text-sm font-normal text-[#09090B] md:space-y-2 lg:px-4 lg:pt-3 lg:text-base xl:space-y-3 3xl:px-5 [&>p]:m-0 [&>ul]:list-inside [&>ul]:list-disc"
                      dangerouslySetInnerHTML={{
                        __html: item?.content,
                      }}
                    ></div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

// helpers/getWorkUnits.ts
export function getWorkUnits(dataDetail: any) {
  const t = useTranslations('Doctor');
  const tHref = useTranslations('Href');
  const units: any[] = [];

  // Nếu là giám đốc hoặc phó giám đốc → thêm Ban Giám Đốc
  if (
    dataDetail?.hospital_title === 'director' ||
    dataDetail?.hospital_title === 'deputy_director'
  ) {
    units.push({
      slug: tHref('board_of_directors'),
      title: t('board_of_directors'),
    });
  }

  // trung tâm hoặc viện
  if (dataDetail?.department_groups) {
    units.push(
      ...dataDetail.department_groups.map(
        ({ department_groups_slug: group }: any) => ({
          slug: `/${group?.parent_group}/${group?.slug}`,
          title: group?.code ? `${group?.title} (${group.code})` : group?.title,
        }),
      ),
    );
  }

  // Chuyên khoa
  if (dataDetail?.departments) {
    units.push(
      ...dataDetail.departments.map(({ department }: any) => ({
        slug: `/chuyen-khoa/${department?.slug}`,
        title: department?.code
          ? `${department?.title} (${department.code})`
          : department?.title,
      })),
    );
  }

  return units;
}

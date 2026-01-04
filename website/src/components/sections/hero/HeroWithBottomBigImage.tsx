'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import { formatDate } from '@/src/utils/validate';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';

export default function HeroWithBottomBigImage({
  data,
  dataDetail,
}: CommonSection) {
  const hasContent =
    dataDetail?.title ||
    dataDetail?.date_established ||
    dataDetail?.organizational_structure ||
    dataDetail?.cover;

  if (hasContent === null || hasContent.length === 0) return null;

  return (
    <section className="bg-[#F6FAF7]">
      <div className="container">
        <div className="flex flex-col items-stretch gap-4 pt-6 md:gap-6 md:pt-8 lg:gap-5 lg:pt-10 xl:gap-7 xl:pt-12 2xl:pt-[56px] 3xl:gap-10 3xl:pt-[64px] 4xl:pt-[72px]">
          {dataDetail?.title && (
            <h1 className="text-[28px] font-bold leading-[1.3] text-[#09090B] md:text-[32px] lg:basis-5/12 lg:text-[36px] xl:text-[40px] 2xl:basis-6/12 2xl:text-[48px] 3xl:text-[56px] 4xl:text-[64px]">
              {dataDetail?.title} {dataDetail?.code && ` (${dataDetail.code})`}
            </h1>
          )}

          <div className="flex flex-col items-start gap-2 md:flex-row md:gap-8 lg:gap-10 xl:gap-14">
            <div className="space-y-[2px] lg:space-y-1 2xl:space-y-2">
              <div className="whitespace-nowrap text-nowrap text-base font-normal text-[#71717A] md:text-lg xl:text-xl">
                {data?.title}
              </div>

              <div className="text-base font-semibold text-[#09090B] md:text-lg xl:text-xl 2xl:text-[22px] 2xl:!leading-[1.3] 3xl:text-2xl">
                {dataDetail?.date_established
                  ? formatDate(dataDetail?.date_established)
                  : 'Đang cập nhật'}
              </div>
            </div>

            <div className="space-y-[2px] lg:space-y-1 2xl:space-y-2">
              <div className="whitespace-nowrap text-nowrap text-base font-normal text-[#71717A] md:text-lg xl:text-xl">
                {data?.subtitle}
              </div>
              <div
                className="text-base font-semibold text-[#09090B] md:text-lg xl:text-xl 2xl:text-[22px] 2xl:!leading-[1.3] 3xl:text-2xl"
                dangerouslySetInnerHTML={{
                  __html: dataDetail?.organizational_structure,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-[24px_0] md:p-[32px_0] lg:p-[48px_0] 2xl:p-[64px_0_40px] 3xl:p-[80px_0_40px]">
          <Fancybox
            options={{
              Carousel: {
                infinite: true,
              },
              Images: {
                zoom: true,
              },
            }}
            className="w-full"
          >
            <Link
              href={getAssetUrlById(dataDetail?.cover)}
              data-fancybox="gallery"
              className="relative block aspect-[9/4] w-full overflow-hidden rounded-[6px]"
            >
              <NextImg
                src={getAssetUrlById(dataDetail?.cover)}
                objectFit="cover"
                alt="banner image"
              />
            </Link>
          </Fancybox>
        </div>
      </div>
    </section>
  );
}

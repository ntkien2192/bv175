'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { Link } from '@/src/i18n/navigation';
import CustomLink from '../../common/custom-link';

export default function InfoBasicR({ data }: CommonSection) {

  return (
    <section className="bg-white py-10 md:py-8 lg:py-10 xl:py-[60px] 2xl:py-[80px] 4xl:py-[100px]">
      <div className="container flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14 2xl:gap-16 3xl:gap-[72px] 4xl:gap-[80px]">
        <div className="relative aspect-[3/2] overflow-hidden rounded-md lg:basis-1/2">
          <NextImg
            src={getAssetUrlById(data?.cover?.id)}
            objectFit="cover"
            alt="Quy mô background"
          />
          <CustomLink
            aria-label="Xem bản đồ"
            href={data?.buttons?.[1]?.url}
            className="btn-danger absolute bottom-2 right-2 z-[10] bg-primary-100 text-primary-500 xl:bottom-4 xl:right-4 4xl:bottom-6 4xl:right-6"
          >
            {data?.buttons?.[1]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg
                src={'/assets/icons/compass-navigation.svg'}
                alt="icon"
              />
            </div>
          </CustomLink>
        </div>

        <div className="space-y-5 lg:basis-1/2 xl:space-y-7 3xl:space-y-8 4xl:space-y-10">
          <div className="space-y-4 2xl:space-y-5 3xl:space-y-6">
            {data?.title && (
              <h1 className="section-title uppercase text-primary-600">
                {data?.title}
              </h1>
            )}

            <div
              className="section-content text-justify"
              dangerouslySetInnerHTML={{
                __html: data?.contents,
              }}
            ></div>

            <div
              className="text-lg font-medium !leading-[1.3] text-black md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]"
              dangerouslySetInnerHTML={{
                __html: data?.blurb,
              }}
            ></div>
          </div>

          <Link
            href={`${data?.buttons?.[0]?.url}`}
            className="mt-6 flex items-center gap-2 font-medium text-gray-950 group-hover:text-primary-50 lg:mt-0 lg:text-lg xl:mt-6"
            aria-label="Xem chi tiết cơ sở vật chất"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg src={'/assets/icons/arrow_right_black.svg'} alt="icon" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

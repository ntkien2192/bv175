'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';

export default function Card3Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-[72px] 3xl:py-[80px] 4xl:py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-9 4xl:gap-10">
          <div>
            {data?.title && (
              <h2
                className="section-title font-bold text-primary-600"
                dangerouslySetInnerHTML={{
                  __html: data?.title,
                }}
              ></h2>
            )}
          </div>

          {data?.buttons?.map((item: any, index: number) => (
            <div
              key={index}
              className="space-y-4 rounded-[6px] bg-white p-4 md:p-5 lg:space-y-5 lg:p-6 xl:p-7 2xl:space-y-6 2xl:p-8 3xl:p-9 4xl:p-10"
            >
              <div className="flex items-center gap-4 lg:gap-5 2xl:gap-6">
                <div className="relative size-8 md:size-9 xl:size-10 2xl:size-11 3xl:size-12">
                  <NextImg src={getAssetUrlById(item?.icon?.id)} alt="icon" />
                </div>
                <div className="text-lg font-bold text-[#09090B] md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]">
                  {item?.title}
                </div>
              </div>

              <div
                className="text-sm font-medium text-[#09090B] md:text-base xl:text-lg 3xl:text-xl [&_li]:mt-1 [&_ul]:ml-1 [&_ul_ul]:ml-4 [&_ul]:list-inside [&_ul]:list-disc"
                dangerouslySetInnerHTML={{
                  __html: item?.blurb,
                }}
              ></div>
            </div>))}
        </div>
      </div>
    </section>
  );
}


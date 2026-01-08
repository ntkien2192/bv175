'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function Card2Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-10 md:py-12 lg:py-14 xl:py-[60px] 2xl:py-[72px] 3xl:py-[80px] 4xl:py-[100px]">
      <div className="flex flex-col items-stretch gap-6 md:gap-6 xl:gap-12 2xl:gap-[52px] 4xl:gap-[60px]">
        <div className="container space-y-4 lg:space-y-5 2xl:space-y-6">
          {data?.title && (
            <h1 className="section-title text-center md:text-start uppercase text-primary-600">
              {data?.title}
            </h1>
          )}
          <div
            className="section-content w-full text-justify 2xl:w-1/2"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>
        </div>

        <div className="container grid grid-cols-2 justify-between gap-10 md:gap-4 lg:gap-5 xl:gap-6 3xl:gap-7 4xl:gap-8 md:flex">
          {data?.items?.map((item: any, index: number) => {
            const isOdd = data?.items?.length % 2 !== 0;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-3 lg:gap-4 xl:gap-5 3xl:gap-6 md:flex-1 ${isOdd ? 'last:col-span-full' : ''}`}
              >
                <div className="relative size-14 lg:size-16 xl:size-16 2xl:size-[72px] 3xl:size-[80px]">
                  <NextImg
                    src={getAssetUrlById(item?.cover?.id)}
                    alt="Giá trị cốt lõi icon"
                  />
                </div>
                {item?.title && (
                  <h2 className="text-xl font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white lg:text-2xl xl:text-[30px] 2xl:text-[32px] 3xl:text-[36px]">
                    {item?.title}
                  </h2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

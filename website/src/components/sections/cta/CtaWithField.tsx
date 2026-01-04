'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import FormContact from './FormContact';

export default function CtaWithField({ data }: CommonSection) {
  return (
    <div className="container space-y-8 py-10 lg:py-12 xl:space-y-10 xl:py-16 2xl:space-y-12 2xl:py-[72px] 3xl:space-y-14 3xl:py-[80px] 4xl:space-y-16 4xl:py-[100px]">
      <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-2 lg:gap-8 xl:gap-9 2xl:gap-10 3xl:gap-11 4xl:gap-12">
        <div>
          {data?.title && (
            <h2
              className="text-[40px] font-bold !leading-[1.3] text-primary-600 md:text-[44px] lg:text-[48px] xl:text-[52px] 2xl:text-[56px] 3xl:text-[64px] 4xl:text-[72px]"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          )}
        </div>

        <div className="hidden items-end lg:flex">
          <div
            className="text-sm font-normal text-black lg:text-base 2xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:gap-7 lg:grid-cols-2 lg:gap-8 xl:gap-9 2xl:gap-10 3xl:gap-11 4xl:gap-12">
        <div className="flex items-end">
          <FormContact buttonTitle={data?.buttons?.[0]?.title} />
        </div>

        <div className="space-y-5 md:space-y-7">
          <div
            className="text-sm font-normal text-black lg:hidden lg:text-base 2xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
          <div
            className="map-contact relative aspect-[3/2] w-full overflow-hidden rounded-[8px]"
            dangerouslySetInnerHTML={{
              __html: data?.contents,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

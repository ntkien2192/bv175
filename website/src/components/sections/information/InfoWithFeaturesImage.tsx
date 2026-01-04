'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';

export default function InfoWithFeaturesImage({ data }: CommonSection) {
  return (
    <div className="container flex flex-col gap-20 py-10 md:gap-40 md:py-12 lg:py-20 xl:flex-row xl:gap-6 2xl:py-24 2xl:gap-7 3xl:py-[140px] 4xl:justify-between">
      <div className="grid grid-cols-1 gap-8 md:gap-6 md:grid-cols-2 lg:gap-10 xl:gap-14 2xl:gap-16 3xl:gap-[72px] 4xl:gap-[80px]">
        {data?.items?.map((item: any, index: number) => (
          <div className="space-y-2 md:space-y-4" key={'i_' + index}>
            {item?.title && (
              <h1 className="section-title uppercase text-primary-600">
                {item?.title}
              </h1>
            )}
            <div
              className="section-content text-justify"
              dangerouslySetInnerHTML={{ __html: item?.blurb }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

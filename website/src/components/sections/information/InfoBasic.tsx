'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function InfoBasic({ data }: CommonSection) {

  return (
    <section className="bg-white py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <div className="container grid grid-cols-1 gap-11 md:gap-6 lg:grid-cols-2 2xl:gap-7 3xl:gap-8 4xl:gap-10">
        <div className="space-y-4 xl:space-y-6 2xl:space-y-7 3xl:space-y-8 4xl:space-y-10">
          {data?.title && (
            <h1 className="section-title uppercase text-primary-600">
              {data?.title}
            </h1>
          )}

          <div
            className="section-content text-justify"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>

          {/* <Link
            href={`/${language}${data?.buttons?.[0]?.url}`}
            className="btn-danger"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="icon"
              />
            </div>
          </Link> */}
        </div>

        <div className="grid grid-cols-2 gap-4 xl:gap-5 3xl:gap-6">
          {data?.cover?.map((coverItem: any, index: number) => {
            const isGroup1 = index % 4 === 0 || index % 4 === 3;

            return (
              <div
                key={index}
                className={`${isGroup1 ? 'items-end even:items-start' : 'items-start even:items-end'} group flex aspect-square justify-end even:justify-start md:aspect-auto lg:aspect-square`}
              >
                <div
                  className={`relative ${isGroup1 ? 'aspect-[4/5] h-full md:h-[200px] lg:h-[196px] xl:h-[210px] 2xl:h-[233px] 3xl:h-[260px] 4xl:h-[300px]' : 'aspect-[5/4] w-full md:w-[200px] lg:w-[196px] xl:w-[210px] 2xl:w-[233px] 3xl:w-[260px] 4xl:w-[300px]'} `}
                >
                  <NextImg
                    src={getAssetUrlById(coverItem?.id)}
                    objectFit="cover"
                    alt="about us image"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

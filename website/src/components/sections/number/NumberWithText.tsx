'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import Counter from '../../animation/Counter';

export default function NumberWithText({ data, dataDetail }: CommonSection) {
  const hasContent = dataDetail?.research_project?.length;
  if (!hasContent) return null;

  return (
    <section className="bg-primary-600 py-10 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        {data?.title && (
          <h2
            className="section-title !text-primary-50"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h2>
        )}

        <div className="flex flex-col items-stretch gap-4 md:flex-row md:gap-2 lg:gap-4 3xl:gap-6">
          {dataDetail?.research_project?.map((item: any, index: number) => {
            const num = Number(item?.number) || index + 1;

            return (
              <Counter
                innerText={num}
                snap={1}
                duration={1.5}
                key={index}
                className="flex-1 space-y-1 lg:space-y-[6px] 2xl:space-y-2 4xl:space-y-3"
              >
                {item?.number && (
                  <div
                    data-aos="true"
                    className="text-[28px] font-medium leading-[1.4] text-white md:leading-[1.3] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] 3xl:text-[44px] 4xl:text-[48px]"
                  >
                    0
                  </div>
                )}

                <div
                  className="text-sm font-normal text-white lg:text-base 2xl:text-lg 4xl:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: item?.text,
                  }}
                ></div>
              </Counter>
            );
          })}
        </div>
      </div>
    </section>
  );
}

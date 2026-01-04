'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import Counter from '../../animation/Counter';

export default function NumberNone({ data }: CommonSection) {
  return (
    <section className="bg-primary-600 py-10 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container flex flex-col items-stretch gap-4 md:flex-row md:gap-2 lg:gap-4 3xl:gap-6">
        {data?.items?.map((item: any, index: number) => {
          const num = Number(item?.title) || 0;

          return (
            <Counter
              innerText={num}
              snap={1}
              duration={1.5}
              key={index}
              className="flex-1 space-y-1 lg:space-y-[6px] 2xl:space-y-2 4xl:space-y-3"
            >
              <div className="text-[28px] font-medium leading-[1.4] text-white md:leading-[1.3] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] 3xl:text-[44px] 4xl:text-[48px]">
                <span>{item?.blurb}</span>
                <span data-aos="true">0</span>
                <span>{item?.content}</span>
              </div>

              <div className="text-sm font-normal text-[#ACD1B8] lg:text-base 2xl:text-lg 4xl:text-xl">
                {item?.subtitle}
              </div>
            </Counter>
          );
        })}
      </div>
    </section>
  );
}

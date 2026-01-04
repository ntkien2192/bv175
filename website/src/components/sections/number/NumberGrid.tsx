import { CommonSection } from '@/src/types/pageBuilder';
import React, { Fragment } from 'react';
import Counter from '../../animation/Counter';

export default function NumberGrid({ data }: CommonSection) {
  return (
    <section className="bg-primary-600 py-10 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container">
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10">
          {data?.items?.map((item: any, index: number) => {
            const num = Number(item?.title) || 0;

            return (
              <Fragment key={index}>
                <div
                  className={`${index % 3 === 0 && index !== 0 ? 'hidden md:block' : 'hidden'} col-span-full h-[1px] bg-primary-300`}
                ></div>

                <Counter
                  innerText={num}
                  snap={1}
                  duration={1.5}
                  className={`relative flex-1 space-y-1 md:text-center lg:space-y-[6px] 2xl:space-y-2 4xl:space-y-3`}
                >
                  <div className="text-[30px] font-medium leading-[1.4] text-white md:leading-[1.3] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] 3xl:text-[56px] 4xl:text-[60px]">
                    <span>{item?.blurb}</span>
                    <span data-aos="true">0</span>
                    <span>{item?.content}</span>
                  </div>

                  <div className="text-sm font-normal text-[#ACD1B8] lg:text-base 2xl:text-lg 4xl:text-xl">
                    {item?.subtitle}
                  </div>
                  {(index + 2) % 3 === 0 && (
                    <>
                      <div className="absolute -left-3 top-0 hidden h-full w-[1px] bg-primary-300 md:block lg:-left-3.5 xl:-left-4 2xl:-left-5"></div>
                      <div className="absolute -right-3 top-0 hidden h-full w-[1px] bg-primary-300 md:block lg:-right-3.5 xl:-right-4 2xl:-right-5"></div>
                    </>
                  )}
                </Counter>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

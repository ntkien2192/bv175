import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';

export default function Card2ColWithBlurb({ data, dataDetail }: CommonSection) {
  const hasContent = dataDetail?.functionalities;

  if (hasContent === null || hasContent.length === 0) return null;

  return (
    <section className="py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        <div className="space-y-1">
          <div className="section-sub-title">{data?.subtitle}</div>

          {data?.title && (
            <h2
              className="section-title mt-1"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></h2>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
          {dataDetail?.functionalities?.map((item: any, index: number) => {
            const isOdd = dataDetail?.functionalities?.length % 2 !== 0;
            return (
              <div
                key={index}
                className={`${isOdd ? 'last:col-span-full' : ''} group flex flex-col gap-3 rounded-[6px] bg-primary-50 p-5 transition-colors duration-200 *:transition-colors *:duration-200 hover:bg-primary-600 md:p-6 lg:p-7 xl:gap-5 xl:p-8 2xl:gap-6 2xl:p-9 3xl:p-10`}
              >
                {/* <div className="text-[28px] font-semibold leading-[1.3] text-[#71717A] group-hover:text-primary-100 lg:text-[32px] xl:text-[36px] 3xl:text-[40px]">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </div> */}

                <div
                  className="section-content font-normal text-[#09090B] group-hover:text-[#F4F4F5]"
                  dangerouslySetInnerHTML={{
                    __html: item?.text,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

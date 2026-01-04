'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';

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

        {/* <div className="container hidden grid-cols-2 gap-6 lg:grid xl:gap-7 2xl:gap-8 4xl:gap-10">
          {data?.items?.map((item: any, index: number) => {
            const isOdd = data?.items?.length % 2 !== 0;

            return (
              <div
                key={index}
                className={`${isOdd ? 'last:col-span-full' : ''} group space-y-5 rounded-[6px] bg-white p-6 duration-200 hover:bg-primary-600 md:p-7 xl:space-y-6 xl:p-8 3xl:p-10`}
              >
                <div className="flex items-start justify-between">
                  <div className="relative size-14 transition-all duration-200 group-hover:brightness-0 group-hover:invert xl:size-[72px] 3xl:size-[80px]">
                    <NextImg
                      src={getAssetUrlById(item?.cover?.id)}
                      alt="Giá trị cốt lõi icon"
                    />
                  </div>

                  <div className="text-[28px] font-medium text-[#71717A] duration-200 group-hover:text-primary-100 xl:text-[36px] 3xl:text-[40px]">
                    0{index + 1}
                  </div>
                </div>

                <div className="space-y-2 xl:space-y-3 3xl:space-y-4">
                  {item?.title && (
                    <h2 className="text-[28px] font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white xl:text-[32px] 3xl:text-[40px]">
                      {item?.title}
                    </h2>
                  )}
                  <div
                    className="text-base font-normal leading-[1.5] text-[#71717A] duration-200 group-hover:text-[#F4F4F5] xl:text-lg 3xl:text-xl 3xl:leading-[1.6] text-justify"
                    dangerouslySetInnerHTML={{
                      __html: item?.blurb,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
          
        </div>

        <div className="relative lg:hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.1}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Grid]}
            grid={{
              rows: 1,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2.1,
              },
            }}
            className="swiper-card-2-col w-full !px-6 md:!px-[calc((100vw-688px)/2)]"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="group h-full space-y-5 rounded-[6px] bg-white p-6 duration-200 hover:bg-primary-600 md:p-7 xl:space-y-6 xl:p-8 3xl:p-10">
                  <div className="flex items-start justify-between">
                    <div className="relative size-14 transition-all duration-200 group-hover:brightness-0 group-hover:invert xl:size-[72px] 3xl:size-[80px]">
                      <NextImg
                        src={getAssetUrlById(item?.cover?.id)}
                        alt="Giá trị cốt lõi icon"
                      />
                    </div>

                    <div className="text-[28px] font-medium text-[#71717A] duration-200 group-hover:text-primary-100 xl:text-[36px] 3xl:text-[40px]">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="space-y-2 xl:space-y-3 3xl:space-y-4">
                    {item?.title && (
                      <h2 className="text-[28px] font-bold leading-[1.25] text-gray-950 duration-200 group-hover:text-white xl:text-[32px] 3xl:text-[40px]">
                        {item?.title}
                      </h2>
                    )}
                    <div
                      className="section-content font-normal leading-[1.5] text-[#71717A] duration-200 group-hover:text-[#F4F4F5] 3xl:leading-[1.6] text-justify"
                      dangerouslySetInnerHTML={{
                        __html: item?.blurb,
                      }}
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </div>
    </section>
  );
}

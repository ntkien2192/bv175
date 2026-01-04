'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function GalleryAlternate({ data }: CommonSection) {
  const { paginationClass, paginationConfig } = useSwiperPagination();

  return (
    <div className="py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <div
        className="section-title container uppercase text-primary-600"
        dangerouslySetInnerHTML={{
          __html: data?.title,
        }}
      ></div>

      <div className="pt-8 lg:container md:pt-9 lg:pt-10 xl:pt-11 2xl:pt-12 3xl:pt-[52px] 4xl:pt-[60px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:px-0 2xl:gap-7 3xl:gap-8 4xl:gap-10">
          <div
            className="px-6 text-justify text-sm font-normal text-[#3F3F46] md:px-[calc((100vw-688px)/2)] lg:px-0 xl:text-base xl:!leading-[1.5] 3xl:text-lg 4xl:text-xl 4xl:!leading-[1.6]"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>

          <div className="flex justify-center">
            {paginationClass && paginationConfig && (
              <div className="relative w-full lg:aspect-[3/4] lg:w-[90%]">
                <div className="relative size-full overflow-hidden lg:rounded-[16px] 2xl:rounded-[20px] 4xl:rounded-[24px]">
                  <Swiper
                    touchEventsTarget="container"
                    grabCursor={true}
                    slidesPerView={1.1}
                    loop={false}
                    spaceBetween={16}
                    speed={700}
                    modules={[Navigation, Pagination]}
                    navigation={{
                      nextEl: '.gallery-alternate-btn-next',
                      prevEl: '.gallery-alternate-btn-prev',
                    }}
                    pagination={paginationConfig}
                    breakpoints={{
                      768: {
                        slidesPerView: 2.2,
                      },
                      1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                      },
                    }}
                    className="!px-6 md:!px-[calc((100vw-688px)/2)] lg:!h-full lg:!px-0"
                  >
                    {data?.cover?.map((item: any, index: number) => (
                      <SwiperSlide key={index} className="lg:!h-full">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[6px] lg:aspect-auto lg:h-full lg:rounded-none">
                          <NextImg
                            src={getAssetUrlById(item?.id)}
                            objectFit="cover"
                            alt="image"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <button className="btn-slider gallery-alternate-btn-prev absolute left-0 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
                  <div className="relative size-6">
                    <NextImg
                      src="/assets/icons/arrow_left_white.svg"
                      alt="arrow white left"
                    />
                  </div>
                </button>

                <button className="btn-slider gallery-alternate-btn-next absolute right-0 top-1/2 z-[1] hidden -translate-y-1/2 translate-x-1/2 lg:flex">
                  <div className="relative size-6 rotate-180">
                    <NextImg
                      src="/assets/icons/arrow_left_white.svg"
                      alt="arrow white left"
                    />
                  </div>
                </button>

                <div className="absolute bottom-5 left-1/2 z-[1] hidden h-4 w-full -translate-x-1/2 lg:flex justify-center">
                  <div className={`${paginationClass} !w-fit`}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

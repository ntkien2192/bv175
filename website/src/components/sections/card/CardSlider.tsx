'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useMemo, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import CustomLink from '../../common/custom-link';
import Fancybox from '../../common/Fancybox';

const CardSlider = ({ data }: CommonSection) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const item = useMemo(
    () => data?.items?.[activeItem],
    [activeItem, data?.items],
  );

  const btn = data?.buttons?.[0];

  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 2xl:py-20 3xl:py-[100px] 4xl:py-[120px]">
      <h3 className="section-title container uppercase text-primary-600">
        {data?.title}
      </h3>

      {/* navigation dots */}
      <div className="pt-6 lg:container lg:pt-7 xl:pt-9 2xl:pt-10 3xl:pt-11 4xl:pt-14">
        <div className="relative w-full overflow-hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={'auto'}
            loop={false}
            spaceBetween={80}
            speed={700}
            breakpoints={{
              768: {
                spaceBetween: 80,
              },
              1280: {
                spaceBetween: 70,
              },
              1440: {
                spaceBetween: 80,
              },
              1600: {
                spaceBetween: 94,
              },
              1920: {
                spaceBetween: 104,
              },
            }}
            className="!w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-6 xl:!px-7 3xl:!px-8 4xl:!px-10"
          >
            {data?.items?.map((item: any, index: number) => {
              const isActive = index === activeItem;
              // const year = new Date(item?.subtitle).getFullYear();

              return (
                <SwiperSlide key={'dot_' + index} className="!w-fit">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(index);
                    }}
                    className="flex w-fit cursor-pointer flex-col items-center gap-2 xl:gap-3 4xl:gap-4"
                  >
                    <div
                      className={`${isActive ? 'bg-white' : 'bg-transparent'} size-9 rounded-full p-[6px] transition-all duration-200 xl:size-10 4xl:size-11`}
                    >
                      <div
                        className={`${isActive ? 'bg-primary-600' : 'bg-[#D4D4D8]'} size-full rounded-full transition-all duration-200`}
                      ></div>
                    </div>

                    <div
                      className={`${isActive ? 'text-primary-600' : 'text-[#969696]'} text-2xl font-semibold transition-all duration-200 xl:text-[28px] xl:!leading-[1.5] 4xl:text-[32px]`}
                    >
                      {item?.subtitle}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="absolute left-0 top-0 h-[6px] w-full translate-y-[calc(18px-3px)] bg-[#D4D4D8] xl:translate-y-[calc(20px-4px)] 4xl:translate-y-[calc(22px-4px)]"></div>
        </div>
      </div>

      {/* content */}
      <div className="container flex flex-col items-stretch gap-4 pt-6 md:gap-6 lg:flex-row lg:items-start lg:pt-8 xl:gap-8 xl:pt-10 2xl:pt-11 3xl:gap-10 3xl:pt-12 4xl:pt-[52px]">
        <div className="lg:basis-1/2">
          <p className="mb-1 text-sm font-semibold text-primary-500 2xl:text-base">
            {item?.title}
          </p>

          <h4 className="text-[30px] font-bold leading-[1.25] text-primary-950 md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
            {new Date(item?.subtitle).getFullYear() || ''}
          </h4>

          <div
            className="section-content my-4 text-justify lg:my-6 xl:my-7 3xl:my-8 4xl:my-10"
            dangerouslySetInnerHTML={{
              __html: item?.blurb as string,
            }}
          ></div>

          <CustomLink className="btn-danger px-4" href={btn?.url}>
            {btn?.title || ''}
          </CustomLink>
        </div>

        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
            Images: {
              zoom: true,
            },
          }}
          className="flex justify-center lg:basis-1/2 lg:px-[14px] xl:px-[22px] 4xl:px-10"
        >
          <Link
            href={getAssetUrlById(item?.cover?.id)}
            data-fancybox="gallery"
            className="relative block aspect-[3/2] w-full md:w-[394px] lg:w-full"
          >
            <NextImg
              src={getAssetUrlById(item?.cover?.id)}
              alt="Giá trị cốt lõi icon"
              objectFit="contain"
            />
          </Link>
        </Fancybox>
      </div>
    </section>
  );
};

export default CardSlider;

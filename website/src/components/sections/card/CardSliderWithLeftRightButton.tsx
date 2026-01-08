'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import CustomLink from '../../common/custom-link';
import { useTranslations } from 'next-intl';

export default function CardSliderWithLeftRightButton({ data }: CommonSection) {
  const t = useTranslations('Doctor');

  return (
    <section className="flex flex-col items-stretch gap-6 bg-[#F6FAF7] py-10 md:gap-8 md:py-6 lg:py-10 xl:gap-11 xl:py-11 2xl:gap-12 2xl:py-12 3xl:gap-[52px] 3xl:py-[52px] 4xl:gap-[60px] 4xl:py-[60px]">
      <div className="container flex items-center justify-between">
        <div>
          {data?.subtitle && (
            <p className="section-sub-title text-primary-500">
              {data?.subtitle}
            </p>
          )}
          {data?.title && (
            <h2 className="section-title text-primary-600">
              {data?.title}
            </h2>
          )}
        </div>

        {data?.buttons && (
          <div className="hidden w-fit md:block">
            <CustomLink
              href={`${data?.buttons?.[0]?.url}`}
              aria-label="Chuyển đến trang thành tích"
              className="btn-danger"
            >
              {data?.buttons?.[0]?.title}
              <div className="relative size-5 2xl:size-6">
                <NextImg
                  src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                  alt="icon"
                />
              </div>
            </CustomLink>
          </div>
        )}
      </div>

      <div className="space-y-6 lg:container md:space-y-8 lg:space-y-10 xl:space-y-12">
        <div className="relative">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Navigation]}
            navigation={{
              nextEl: '.card-slider-with-l-r-button-next',
              prevEl: '.card-slider-with-l-r-button-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex w-full flex-col items-center gap-2 lg:gap-3 2xl:gap-4">
                  <div className="relative h-[100px] w-[70px] md:h-[140px] md:w-[96px] 2xl:h-[164px] 2xl:w-[114px] 3xl:h-[180px] 3xl:w-[124px] 4xl:h-[200px] 4xl:w-[140px]">
                    <NextImg
                      src={getAssetUrlById(item?.cover?.id)}
                      alt="Danh hiệu image"
                    />
                  </div>
                  <div
                    className="px-3 text-center text-sm font-medium text-black md:px-4 lg:px-5 lg:text-base 2xl:text-lg 4xl:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: item?.title,
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="card-slider-with-l-r-button-prev absolute left-0 top-1/2 z-[1] hidden size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:-translate-x-[calc(100%+24px)] 2xl:size-11 3xl:-translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>

          <button className="card-slider-with-l-r-button-next absolute right-0 top-1/2 z-[1] hidden size-8 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:translate-x-[calc(100%+24px)] 2xl:size-11 3xl:translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6 rotate-180">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>
        </div>

        {data?.buttons && (
          <div className="container pt-6 md:hidden">
            <CustomLink
              href={`${data?.buttons?.[0]?.url}`}
              aria-label="Chuyển đến trang thành tích"
              className="btn-danger"
            >
              {data?.buttons?.[0]?.title}
              <div className="relative size-5 2xl:size-6">
                <NextImg
                  src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                  alt="icon"
                />
              </div>
            </CustomLink>
          </div>
        )}

        {data?.contents && (
          <div className="w-full space-y-2 !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0">
            <div className="flex items-start gap-2 md:gap-3 lg:gap-4 3xl:gap-6 4xl:gap-6">
              <div className="relative size-6 md:size-7 lg:size-8 xl:size-9 2xl:size-10 3xl:size-11 4xl:size-12">
                <NextImg
                  src="/assets/icons/medal.svg"
                  alt="medal"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 space-y-3 lg:space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-8">
                <h3 className="text-lg font-bold !leading-[1.3] text-primary-950 md:text-xl lg:text-[22px] xl:text-2xl 2xl:text-[28px] 3xl:text-[30px] 4xl:text-[32px]">
                  {data?.blurb ?? t('awards')}
                </h3>
                <div
                  className="hidden text-sm font-normal text-gray-700 md:block lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
                  dangerouslySetInnerHTML={{
                    __html: data?.contents,
                  }}
                ></div>
              </div>
            </div>

            <div
              className="text-sm font-normal text-gray-700 md:hidden lg:text-base 4xl:text-lg [&>ul]:list-inside [&>ul]:list-disc"
              dangerouslySetInnerHTML={{
                __html: data?.contents,
              }}
            ></div>
          </div>
        )}
      </div>
    </section>
  );
}

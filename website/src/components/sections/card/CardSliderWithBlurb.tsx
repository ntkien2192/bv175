'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { handleScrollTo } from '@/src/utils/gsap';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
export default function CardSliderWithBlurb({ data }: CommonSection) {
  const { conditions } = useGsapMatchMedia();
  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="section-title container uppercase text-primary-600">
        {data?.title}
      </div>

      <div className="pt-8 lg:container md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-11 3xl:pt-12 4xl:pt-[52px]">
        <div className="relative w-full">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            // autoHeight={true}
            grid={{
              rows: 1,
            }}
            modules={[Grid, Navigation]}
            navigation={{
              nextEl: '.card-slider-with-blurb-next',
              prevEl: '.card-slider-with-blurb-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 3.3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="swiper-card-slider-with-blurb w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-6 xl:!px-4 3xl:!px-5 4xl:!px-6"
          >
            {data?.items?.map((item: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <SwiperSlide key={index} className="!h-full">
                  <div
                    className={`relative flex h-full flex-col items-stretch gap-3 lg:grid lg:grid-rows-2 lg:gap-[78px] 2xl:gap-[86px] 3xl:gap-[94] 4xl:gap-[100px]`}
                  >
                    <div
                      className={`${isEven ? 'flex-col lg:order-1' : 'flex-col lg:order-2 lg:flex-col-reverse'} flex flex-1 items-center justify-start lg:justify-end`}
                    >
                      <button
                        onClick={() =>
                          handleScrollTo(
                            `${item?.buttons?.[0]?.url}`,
                            conditions,
                          )
                        }
                        className="w-full flex-1 space-y-[6px] rounded-md bg-white p-3 lg:flex-none lg:p-3 xl:space-y-2 2xl:p-4"
                        style={{
                          boxShadow: '0 1px 2px 0 rgba(18, 26, 43, 0.05)',
                        }}
                      >
                        <div className="relative aspect-[3/4] w-full">
                          <NextImg
                            src={getAssetUrlById(item?.cover?.id)}
                            objectFit="cover"
                            alt="Doctor image"
                          />
                        </div>
                        <div className="space-y-[2px] text-center xl:space-y-1">
                          <div className="text-xs font-normal text-[#3F3F46] xl:text-sm">
                            {item?.subtitle}
                          </div>
                          <div className="text-sm font-bold text-primary-600 xl:text-base 3xl:text-lg lg:tracking-tight">
                            {item?.title}
                          </div>
                        </div>
                      </button>

                      <div
                        className={`${isEven ? '' : 'lg:rotate-180'} size-[2px] border-x-[6px] border-t-[6px] border-transparent border-t-white`}
                      ></div>
                    </div>

                    <div
                      className={`hidden lg:block ${isEven ? 'order-2' : 'order-1'}`}
                    ></div>

                    <button
                      onClick={() =>
                        handleScrollTo(`${item?.buttons?.[0]?.url}`, conditions)
                      }
                      className="relative z-[1] mx-auto flex h-10 w-[100px] items-center justify-center rounded-[10px] bg-primary-600 lg:absolute lg:left-1/2 lg:top-1/2 lg:mx-0 lg:h-11 lg:w-[110px] lg:-translate-x-1/2 lg:-translate-y-1/2 2xl:h-11 xl:w-[120px] 3xl:h-12 2xl:w-[124px] 4xl:w-[140px]"
                    >
                      <div className="text-xl font-semibold text-white lg:text-[22px] 3xl:text-2xl">
                        {item?.blurb}
                      </div>
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="absolute left-0 top-full h-2 w-full -translate-y-[22px] bg-[#D4D4D8] lg:top-1/2 lg:-translate-y-1/2"></div>

          <button className="card-slider-with-blurb-prev absolute left-0 top-1/2 z-[1] hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:-translate-x-[calc(100%+24px)] 2xl:size-11 3xl:-translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>

          <button className="card-slider-with-blurb-next absolute right-0 top-1/2 z-[1] hidden size-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:translate-x-[calc(100%+24px)] 2xl:size-11 3xl:translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6 rotate-180">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

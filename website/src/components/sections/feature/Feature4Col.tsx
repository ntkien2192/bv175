'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@/src/i18n/navigation';

export default function Feature4Col({ data }: CommonSection) {
  return (
    <section className="bg-white py-10 md:py-6 lg:py-10 xl:py-[52px] 2xl:py-[64px] 3xl:py-[72px] 4xl:py-[80px]">
      <div className="grid-cols-1 gap-6 md:container md:grid md:grid-cols-3 md:gap-4 xl:gap-4 xl:grid-cols-4 2xl:gap-6 3xl:gap-7">
        <div className="px-6 md:col-span-2 md:px-0 lg:col-span-1">
          <div className="section-sub-title">{data?.subtitle}</div>
          {data?.title && <h1 className="section-title mt-1">{data?.title}</h1>}

          <div
            className="mt-2 text-justify text-sm font-normal text-[#3F3F46] lg:mt-4 3xl:text-base"
            dangerouslySetInnerHTML={{
              __html: data?.blurb as string,
            }}
          ></div>

          <Link
            href={`${data?.buttons?.[0]?.url}` as any}
            className="btn-danger mt-4 lg:mt-5 2xl:mt-6"
            aria-label="Xem tất cả chuyên khoa"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5 2xl:size-6">
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="icon"
              />
            </div>
          </Link>
        </div>

        {data?.items?.map((item: any, index: number) => (
          <Link
            key={index}
            href={`${item?.buttons?.[0]?.url || ''}` as any}
            aria-label="Xem chi tiết chuyên khoa"
            className="group relative hidden flex-col justify-between gap-3 bg-primary-50 p-3 transition-all duration-200 hover:bg-primary-600 hover:shadow-[0_25px_45px_-12px_rgba(18,26,43,0.20)] md:flex xl:gap-4 xl:p-4"
          >
            <div className="space-y-3 xl:space-y-4">
              <div className="relative aspect-video w-full overflow-hidden">
                <NextImg
                  src={getAssetUrlById(item?.cover?.id)}
                  alt="Chuyên khoa image"
                  objectFit="cover"
                />
              </div>

              <div className="space-y-1">
                <div className="line-clamp-2 h-[56px] text-lg font-semibold text-[#010502] transition-all duration-200 group-hover:text-primary-50 xl:h-[64px] xl:text-xl 3xl:h-[68px] 3xl:text-[22px] 4xl:h-[72px] 4xl:text-2xl">
                  {item?.title}
                </div>
                <div
                  className="line-clamp-3 h-[60px] text-sm 3xl:text-base 3xl:h-[72px] font-normal text-[#3F3F46] transition-all duration-200 group-hover:text-primary-50/90"
                  dangerouslySetInnerHTML={{
                    __html: item?.blurb,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-[6px] 2xl:gap-2">
              <div className="text-sm font-medium text-[#09090B] transition-all duration-200 group-hover:text-primary-50 2xl:text-base 4xl:text-lg">
                {data?.buttons?.[1]?.title}
              </div>

              <div className="relative size-5 transition-all duration-200 group-hover:invert 2xl:size-6">
                <NextImg
                  src={getAssetUrlById(data?.buttons?.[1]?.icon.id)}
                  alt="arrow icon"
                />
              </div>
            </div>

            <div className="absolute bottom-[5%] left-0 hidden aspect-[204/136] w-[90%] group-hover:block">
              <NextImg src="/assets/images/arrow_bg.png" alt="icon" />
            </div>
          </Link>
        ))}

        <div className="relative mt-6 md:hidden">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.15}
            loop={false}
            spaceBetween={16}
            speed={700}
            className="w-full !px-6 md:!px-0"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <Link
                  href={`${item?.buttons?.[0]?.url || ''}` as any}
                  aria-label="Xem chi tiết chuyên khoa"
                  className="group relative flex flex-col justify-between gap-3 bg-primary-50 p-3 transition-all duration-200 hover:bg-primary-600 hover:shadow-[0_25px_45px_-12px_rgba(18,26,43,0.20)] xl:gap-4 xl:p-4"
                >
                  <div className="space-y-3 xl:space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <NextImg
                        src={getAssetUrlById(item?.cover?.id)}
                        alt="Chuyên khoa image"
                        objectFit="cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="line-clamp-2 h-[56px] text-lg font-semibold text-[#010502] transition-all duration-200 group-hover:text-primary-50 xl:h-[64px] xl:text-xl 3xl:h-[68px] 3xl:text-[22px] 4xl:h-[72px] 4xl:text-2xl">
                        {item?.title}
                      </div>
                      <div
                        className="line-clamp-3 h-[60px] text-sm font-normal text-[#3F3F46] transition-all duration-200 group-hover:text-[#D1E6D7]"
                        dangerouslySetInnerHTML={{
                          __html: item?.blurb,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-[6px] 2xl:gap-2">
                    <div className="text-sm font-medium text-[#09090B] transition-all duration-200 group-hover:text-primary-50 2xl:text-base 4xl:text-lg">
                      {data?.buttons?.[1]?.title}
                    </div>

                    <div className="relative size-5 transition-all duration-200 group-hover:invert 2xl:size-6">
                      <NextImg
                        src={getAssetUrlById(data?.buttons?.[1]?.icon.id)}
                        alt="arrow icon"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-[5%] left-0 hidden aspect-[204/136] w-[90%] group-hover:block">
                    <NextImg src="/assets/images/arrow_bg.png" alt="icon" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

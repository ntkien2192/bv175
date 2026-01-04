'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import { EffectFade, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import { getAssetUrlById } from '@/src/utils/image';
import NextImg from '../../common/next-img';
import Fancybox from '../../common/Fancybox';
import { SETTINGS } from '@/src/utils/const';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function NumberSplit({ data, dataDetail }: CommonSection) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { paginationClass, paginationConfig } = useSwiperPagination();

  const hasContent =
    !!dataDetail?.achievements || dataDetail?.achievements_images?.length;

  if (!hasContent) return null;

  return (
    <div className="bg-primary-50 p-[32px_0_24px] lg:p-[48px_0_32px] xl:p-[60px_0_32px] 2xl:p-[80px_0_48px] 3xl:p-[100px_0_56px] 4xl:p-[120px_0_60px]">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 bg-white p-4 md:p-5 lg:grid-cols-2 lg:gap-0 lg:p-6 xl:p-7 2xl:p-8 3xl:p-9 4xl:p-10">
          <div className="relative aspect-[4/3] overflow-hidden">
            {paginationClass &&
            paginationConfig &&
            dataDetail?.achievements_images?.length > 0 ? (
              <Fancybox
                options={{
                  Carousel: {
                    infinite: true,
                  },
                  Images: {
                    zoom: true,
                  },
                }}
                className="h-full w-full"
              >
                <Swiper
                  onSwiper={setThumbsSwiper}
                  touchEventsTarget="container"
                  loop={true}
                  spaceBetween={0}
                  slidesPerView={1}
                  watchSlidesProgress={true}
                  modules={[Thumbs, EffectFade]}
                  effect={'fade'}
                  allowTouchMove={false}
                  simulateTouch={false}
                  className="!h-full !w-full"
                >
                  {dataDetail?.achievements_images?.map(
                    (item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <Link
                          href={getAssetUrlById(item?.directus_files_id)}
                          data-fancybox="gallery"
                          className="relative block size-full"
                        >
                          <NextImg
                            src={getAssetUrlById(item?.directus_files_id)}
                            objectFit="cover"
                            alt="facilities images"
                          />
                        </Link>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </Fancybox>
            ) : (
              <div className="relative size-full">
                <NextImg
                  src={SETTINGS.DEFAULT_PLACEHOLDER_IMAGE_URL}
                  alt="unavailable"
                  objectFit="cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-stretch justify-center gap-2 py-2 md:py-2 lg:gap-4 lg:py-0 xl:gap-6 2xl:gap-8 3xl:gap-10">
            <div
              className="section-title font-bold text-primary-600 lg:px-10 xl:px-12 2xl:px-[60px] 3xl:px-[70px] 4xl:px-[80px]"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
            ></div>

            {paginationClass && paginationConfig && (
              <>
                <div>
                  <Swiper
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={0}
                    grabCursor={true}
                    speed={700}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Thumbs, Pagination]}
                    pagination={paginationConfig}
                    className=""
                  >
                    {dataDetail?.achievements?.map(
                      (item: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="space-y-2 lg:px-10 xl:space-y-3 xl:px-12 2xl:px-[60px] 3xl:px-[70px] 4xl:px-[80px]">
                            <div
                              className="text-xl font-semibold !leading-[1.3] text-[#09090B] lg:text-2xl xl:text-[28px] 3xl:text-[32px]"
                              dangerouslySetInnerHTML={{
                                __html: item?.text,
                              }}
                            ></div>
                            <div
                              className="text-base font-normal text-[#71717A] lg:text-lg"
                              dangerouslySetInnerHTML={{
                                __html: item?.timestamp,
                              }}
                            ></div>
                          </div>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                </div>

                <div className="relative pt-2 lg:px-10 xl:px-12 2xl:px-[60px] 2xl:pt-0 3xl:px-[70px] 4xl:px-[80px]">
                  <div className={`${paginationClass} !w-fit`}></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

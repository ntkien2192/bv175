'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function InfoWithRightImageTopTitle({
  data,
  dataDetail,
}: CommonSection) {
  const hasContent = !!dataDetail?.activities;

  const { paginationClass, paginationConfig } = useSwiperPagination();

  if (!hasContent) return null;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        <div className="space-y-1 text-start">
          <div className="section-sub-title">{data?.subtitle}</div>

          <h1
            className="section-title mt-1"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h1>
        </div>

        {dataDetail && dataDetail?.activities_images?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
            <div className="lg:order-2">
              {paginationClass && paginationConfig ? (
                <>
                  <Fancybox
                    options={{
                      Carousel: {
                        infinite: true,
                      },
                      Images: {
                        zoom: true,
                      },
                    }}
                  >
                    <div className="relative aspect-[4/3]">
                      <Swiper
                        touchEventsTarget="container"
                        grabCursor={true}
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={0}
                        speed={700}
                        modules={[Pagination, EffectFade, Autoplay]}
                        effect="fade"
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                        }}
                        pagination={paginationConfig}
                        className="!h-full !w-full"
                      >
                        {dataDetail?.activities_images?.map((item: any) => (
                          <SwiperSlide key={item?.directus_files_id}>
                            <Link
                              href={getAssetUrlById(item?.directus_files_id)}
                              data-fancybox="gallery"
                              className="relative block size-full"
                            >
                              <NextImg
                                src={getAssetUrlById(item?.directus_files_id)}
                                alt="image"
                                objectFit="cover"
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </Fancybox>
                  <div className="relative mt-3 flex h-5 justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                    <div className={`${paginationClass} !w-fit`}></div>
                  </div>
                </>
              ) : (
                <div className="relative aspect-[4/3]">
                  <NextImg
                    src="/assets/images/unavailable.png"
                    alt="unavailable"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>

            <div className="sidebar relative md:overflow-y-auto md:pr-2 lg:order-1 lg:aspect-[4/3]">
              <div
                className={cn(
                  `content-wrapper relative space-y-3 text-justify text-sm font-normal text-[#09090B] transition-all duration-700 ease-in-out xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6`,
                )}
                dangerouslySetInnerHTML={{
                  __html: dataDetail?.activities,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              `content-wrapper relative space-y-3 text-justify text-sm font-normal text-[#09090B] xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6`,
            )}
            dangerouslySetInnerHTML={{
              __html: dataDetail?.activities,
            }}
          ></div>
        )}
      </div>
    </section>
  );
}

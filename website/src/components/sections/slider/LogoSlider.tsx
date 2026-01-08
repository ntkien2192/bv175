'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const LogoSlider = ({ data }: Partial<CommonSection>) => {
  return (
    <section className="py-10 text-center md:py-6 lg:py-8 xl:py-10 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="section-sub-title">{data?.subtitle}</div>
      {data?.title && <h1 className="section-title">{data?.title}</h1>}
      <div className="md:container">
        <div className="relative pt-6 2xl:pt-8 3xl:pt-10">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={2.1}
            loop={false}
            spaceBetween={16}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 32,
              },
              1920: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            className="w-full !px-6 md:!px-0"
          >
            {data?.contents?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[160/52] w-[160px] lg:w-auto">
                  <NextImg src={getAssetUrlById(item?.id)} alt="Doctor image" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;

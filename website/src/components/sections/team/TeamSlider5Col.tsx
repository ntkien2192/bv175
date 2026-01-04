'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import DoctorCard from '../../common/doctor-card';
import CustomLink from '../../common/custom-link';

export default function TeamSlider5Col({ data }: CommonSection) {
  return (
    <section className="bg-primary-50 py-10 md:py-6 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container">
        <div className="section-sub-title text-center">{data?.subtitle}</div>
        {data?.title && (
          <h1 className="section-title mt-1 text-center">{data?.title}</h1>
        )}
      </div>
      <div className="lg:container">
        <div className="relative pt-6 lg:pt-8 xl:pt-11 2xl:pt-12 3xl:pt-[52px] 4xl:pt-[60px]">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.5}
            loop={false}
            spaceBetween={16}
            speed={700}
            modules={[Navigation]}
            navigation={{
              nextEl: '.team-slider-5-col-button-next',
              prevEl: '.team-slider-5-col-button-prev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 3.3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
              1600: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
            // ⭐ CHỈ ĐỂ SLIDE 3 ACTIVE TRÊN MOBILE
            // onSwiper={(swiper) => {
            //   if (window.innerWidth < 768) {
            //     // index slide thứ 3 là 2
            //     swiper.slideTo(2, 0); // 0 = không animation
            //   }
            // }}
          >
            {data?.doctors?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <DoctorCard
                  url={data?.buttons?.[0]?.url}
                  item={item}
                  avatarType="avatar"
                  subTitle="specialty"
                  isHover
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="team-slider-5-col-button-prev absolute left-0 top-1/2 z-[1] hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:-translate-x-[calc(100%+24px)] 2xl:size-11 3xl:-translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>

          <button className="team-slider-5-col-button-next absolute right-0 top-1/2 z-[1] hidden size-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#24422D] hover:bg-[#3E9459] lg:flex xl:size-10 xl:translate-x-[calc(100%+24px)] 2xl:size-11 3xl:translate-x-[calc(100%+30px)] 4xl:size-[54px]">
            <div className="relative size-6 rotate-180">
              <NextImg
                src="/assets/icons/arrow_left_white.svg"
                alt="arrow white left"
              />
            </div>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-center pt-5 xl:pt-6 2xl:pt-7 3xl:pt-8 4xl:pt-10">
          <CustomLink
            href={`${data?.buttons?.[0]?.url}`}
            className="btn-danger"
            aria-label="Xem tất cả bác sĩ"
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
      </div>
    </section>
  );
}

'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import DoctorCard from '../../common/doctor-card';

export default function TeamSlider4Col({ data, dataDetail }: CommonSection) {
  const description = dataDetail.leadership_board_description;
  const doctors = dataDetail.doctors;
  const { custom } = data;

  const hasContent = !!description || (doctors?.length ?? 0) > 0;

  if (!hasContent) return null;
  const doctorCount = dataDetail?.doctors?.length ?? 0;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="grid grid-cols-12 gap-6 lg:container lg:gap-8 xl:gap-10 2xl:grid-cols-11 3xl:gap-10">
        <div
          className={`col-span-full ${doctorCount < 3 ? 'lg:col-span-5 2xl:col-span-4' : 'lg:col-span-5 2xl:col-span-3'} px-6 md:px-[calc((100vw-688px)/2)] lg:px-0`}
        >
          <div className="space-y-1">
            <div className="section-sub-title">{data?.subtitle}</div>

            {data?.title && (
              <h2
                className="section-title mt-1"
                dangerouslySetInnerHTML={{
                  __html: data?.title,
                }}
              ></h2>
            )}
          </div>

          <div
            className="section-content pt-2 text-justify lg:pt-4 2xl:pt-6"
            dangerouslySetInnerHTML={{
              __html: dataDetail?.leadership_board_description,
            }}
          ></div>
        </div>

        <div
          className={`col-span-full ${doctorCount < 3 ? 'lg:col-span-7 xl:pl-10 2xl:pl-16 3xl:pl-[72px] 4xl:pl-20' : 'lg:col-span-7 2xl:col-span-8'}`}
        >
          {doctorCount > 0 && (
            <Swiper
              touchEventsTarget="container"
              grabCursor={true}
              slidesPerView={1.5}
              loop={false}
              spaceBetween={16}
              speed={700}
              breakpoints={{
                768: {
                  slidesPerView: doctorCount < 3 ? 2 : 3,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1440: {
                  slidesPerView: doctorCount < 3 ? 2 : 3,
                  spaceBetween: doctorCount < 3 ? 40 : 24,
                },
              }}
              className="!h-full !w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
            >
              {dataDetail?.doctors?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <DoctorCard
                    item={item?.doctor}
                    url={data?.buttons?.[0]?.url}
                    avatarType={
                      item?.doctor?.avatar
                        ? custom?.avatar_type
                        : 'uniform_avatar'
                    }
                    subTitle={custom?.sub_title}
                    isLogo={custom?.is_logo}
                    isHover={custom?.is_hover}
                    isRounded={custom?.is_rounded}
                    avatarRatio="3/4"
                    isLink={
                      item?.doctor?.is_admin === true ||
                      custom?.is_link === false
                        ? false
                        : custom?.is_link
                    }
                    textSize={doctorCount < 3 ? 'xl' : 'md'}
                    bgColor="#f4f4f5"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}

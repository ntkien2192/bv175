'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '@/src/components/common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

const Posts2Col = ({ data }: CommonSection) => {
  const items = data?.items || [];

  return (
    <section className="py-10 text-center xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="container">
        <div className="section-sub-title">{data?.subtitle}</div>
        {data?.title && <h1 className="section-title">{data?.title}</h1>}
      </div>

      <div className="md:container">
        <div className="relative pt-6 xl:pt-7 2xl:pt-8 4xl:pt-10">
          <Swiper
            touchEventsTarget="container"
            grabCursor={true}
            slidesPerView={1.15}
            loop={false}
            spaceBetween={16}
            speed={700}
            breakpoints={{
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1920: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="w-full !px-6 md:!px-[calc((100vw-688px)/2)] lg:!px-0"
          >
            {items?.length > 0 &&
              items?.map((item: any, index: number) => (
                <SwiperSlide key={'post_' + index}>
                  <div className="group relative block space-y-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 xl:p-4">
                    {/* cover */}
                    <div className="relative aspect-video">
                      <NextImg
                        src={getAssetUrlById(item?.cover?.id || item?.cover)}
                        alt="post cover"
                        objectFit="cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="line-clamp-2 h-[58px] text-lg font-semibold !leading-[1.6] text-primary-1000 duration-200 group-hover:text-primary-50 xl:h-[64px] xl:text-xl 3xl:h-[71px] 3xl:text-[22px] 4xl:h-[77px] 4xl:text-2xl">
                        {item?.title}
                      </div>
                      {item?.blurb && (
                        <div
                          className="line-clamp-3 h-[60px] text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100"
                          dangerouslySetInnerHTML={{
                            __html: item?.blurb,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Posts2Col;

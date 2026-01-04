'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsCard from '../news/NewsCard';
import { fnGetListItemByEndpoint } from '@/src/services/common';
import { getListNews } from '@/src/services/news';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Posts3Col = ({ data }: CommonSection) => {
  const [newsData, setNewsData] = useState<any>([]);
  const category = data?.custom?.category;

  useEffect(() => {
    (async () => {
      try {
        const response = await getListNews({
          collection: data?.collections,
          page: 1,
          limit: 3,
          category,
        });

        setNewsData(response);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        ScrollTrigger.refresh();
      }
    })();
  }, [data]);

  return (
    <div className="py-10 text-center xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="section-sub-title">{data?.subtitle}</div>
      {data?.title && <h1 className="section-title">{data?.title}</h1>}

      <div className="lg:container">
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
            {newsData?.length > 0 &&
              newsData?.map((item: any, index: number) => (
                <SwiperSlide key={'post_' + index}>
                  <NewsCard item={item} url={data?.buttons?.[0]?.url} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Posts3Col;

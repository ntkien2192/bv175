'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';
import { useTranslations } from 'next-intl';

export default function FancyboxViewer({ data }: CommonSection) {
  const images = data?.cover ?? [];
  const imageStyle = data?.custom || {};

  const t = useTranslations('Common');
  const { paginationClass, paginationConfig } = useSwiperPagination();

  return (
    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div
        className="section-content mx-auto mb-6 w-full text-justify lg:mb-8 2xl:mb-10"
        style={{
          maxWidth: imageStyle?.['maxWidth'] ?? 'auto',
        }}
        dangerouslySetInnerHTML={{
          __html: data?.blurb as string,
        }}
      ></div>

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
        {images?.length > 0 &&
          paginationClass &&
          paginationConfig &&
          images.map((image: any) => (
            <div
              key={image?.id}
              className="relative aspect-video h-auto w-full"
              style={imageStyle}
            >
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
                {images?.map((item: any, index: number) => (
                  <SwiperSlide key={item?.id}>
                    <Link
                      href={getAssetUrlById(item?.id)}
                      data-fancybox="gallery"
                      className="relative block size-full"
                    >
                      <div className="relative size-full">
                        <NextImg
                          src={getAssetUrlById(item?.id)}
                          objectFit="cover"
                          className="object-top"
                          alt="facilities images"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
      </Fancybox>

      <p className="mt-10 text-center text-sm font-normal italic text-primary-400">
        {t('click-image')}
      </p>
    </section>
  );
}

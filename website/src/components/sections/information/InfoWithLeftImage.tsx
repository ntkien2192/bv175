'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';
import { useTranslations } from 'next-intl';

export default function InfoWithLeftImage({ data, dataDetail }: CommonSection) {
  const t = useTranslations('Common');

  const hasContent =
    !!dataDetail?.technologies ||
    (Array.isArray(dataDetail?.technologies_images) &&
      dataDetail.technologies_images.length > 0);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  const { paginationClass, paginationConfig } = useSwiperPagination();

  useEffect(() => {
    if (!imageRef.current || !contentRef.current) return;

    const imageHeight = imageRef.current.offsetHeight;
    setMaxHeight(imageHeight);

    if (contentRef.current.scrollHeight > imageHeight) {
      setIsOverflow(true);
    }
  }, [dataDetail, paginationClass, paginationConfig]);

  if (!hasContent) return null;

  const hasImages = dataDetail?.technologies_images?.length > 0;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-10 xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div
        className={`${hasImages ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} container grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]`}
      >
        <div ref={contentRef} className={cn('relative lg:order-2')}>
          <div
            className={cn(
              'flex flex-col items-stretch gap-2 transition-all duration-300 lg:gap-4 2xl:gap-5',
              hasImages ? 'lg:aspect-[4/3]' : '',
              !expanded && isOverflow && 'overflow-hidden',
            )}
            style={{
              maxHeight: !expanded && maxHeight ? `${maxHeight}px` : 'none',
            }}
          >
            <div className="space-y-1">
              {data?.subtitle && (
                <div className="section-sub-title">{data?.subtitle}</div>
              )}

              {data?.title && (
                <h2
                  className="section-title"
                  dangerouslySetInnerHTML={{
                    __html: data?.title,
                  }}
                ></h2>
              )}
            </div>

            <div
              className={cn(
                'content-wrapper section-content relative text-justify md:pr-2 lg:flex-1',
              )}
              dangerouslySetInnerHTML={{
                __html: dataDetail?.technologies,
              }}
            ></div>
          </div>

          {!expanded && isOverflow && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary-50 to-transparent" />
          )}

          {isOverflow && (
            <div className="relative z-10 mt-3 text-center">
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2 2xl:text-base"
              >
                {expanded ? t('collapse') : t('view-more')}
              </button>
            </div>
          )}
        </div>

        {hasImages && paginationConfig && paginationClass && (
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
            <div
              ref={imageRef}
              className="relative aspect-[4/3] w-full md:aspect-[2/1] lg:aspect-[4/3]"
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
                fadeEffect={{ crossFade: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={paginationConfig}
                className="!h-full !w-full"
              >
                {dataDetail?.technologies_images?.map((item: any) => (
                  <SwiperSlide key={item?.directus_files_id}>
                    <Link
                      href={getAssetUrlById(item?.directus_files_id)}
                      data-fancybox="gallery"
                      className="relative block size-full"
                    >
                      <div className="relative size-full">
                        <NextImg
                          src={getAssetUrlById(item?.directus_files_id)}
                          objectFit="cover"
                          alt="facilities images"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="relative mt-3 flex justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
              <div className={`${paginationClass} !w-fit`}></div>
            </div>
          </Fancybox>
        )}
      </div>
    </section>
  );
}

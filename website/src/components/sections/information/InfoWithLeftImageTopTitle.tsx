'use client';

import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useRef, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from '../../common/Fancybox';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { useTranslations } from 'next-intl';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function InfoWithLeftImageTopTitle({
  data,
  dataDetail,
}: CommonSection) {
  const t = useTranslations('Common');

  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  const { paginationClass, paginationConfig } = useSwiperPagination();

  const description = dataDetail ? dataDetail?.description : data?.blurb;
  const images = dataDetail ? dataDetail?.description_images : data?.cover;

  useEffect(() => {
    if (!imageRef.current || !contentRef.current) return;

    const imageHeight = imageRef.current.offsetHeight;
    setMaxHeight(imageHeight);

    if (contentRef.current.scrollHeight > imageHeight) {
      setIsOverflow(true);
    }
  }, [description, paginationClass, paginationConfig]);

  const hasContent =
    !!dataDetail?.description_images ||
    !!dataDetail?.description ||
    !!data?.blurb ||
    !!data?.cover;

  if (!hasContent) return null;

  return (
    <section className="bg-primary-50 py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        {/* Title */}
        <div className="space-y-1 text-center">
          <div className="section-sub-title">{data?.subtitle}</div>
          <h1
            className="section-title mt-1"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          />
        </div>

        {images?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
            {/* Image */}
            <div>
              {paginationConfig && paginationClass ? (
                <>
                  <Fancybox
                    options={{
                      Carousel: { infinite: true },
                      Images: { zoom: true },
                    }}
                  >
                    <div ref={imageRef} className="relative aspect-[4/3]">
                      <Swiper
                        touchEventsTarget="container"
                        grabCursor
                        slidesPerView={1}
                        loop
                        speed={700}
                        effect="fade"
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                        }}
                        modules={[Pagination, EffectFade, Autoplay]}
                        pagination={paginationConfig}
                        className="!h-full !w-full"
                      >
                        {images?.map((item: any) => (
                          <SwiperSlide
                            key={item?.directus_files_id || item?.id}
                          >
                            <Link
                              href={getAssetUrlById(
                                item?.directus_files_id || item?.id,
                              )}
                              data-fancybox="gallery"
                              className="relative block size-full"
                            >
                              <NextImg
                                src={getAssetUrlById(
                                  item?.directus_files_id || item?.id,
                                )}
                                alt="image"
                                objectFit="cover"
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </Fancybox>

                  <div className="relative mt-3 flex justify-center lg:mt-4 xl:mt-5 3xl:mt-6">
                    <div className={`${paginationClass} !w-fit`} />
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

            {/* Content */}
            <div className="sidebar relative lg:aspect-[4/3]">
              <div
                ref={contentRef}
                style={{
                  maxHeight: !expanded && maxHeight ? `${maxHeight}px` : 'none',
                }}
                className={cn(
                  'relative space-y-3 text-justify text-sm font-normal text-[#09090B] transition-all duration-500 ease-in-out xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6',
                  !expanded && isOverflow && 'overflow-hidden',
                )}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />

              {!expanded && isOverflow && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary-50 to-transparent" />
              )}

              {isOverflow && (
                <div className="relative z-10 mt-3 text-center">
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-primary inline-flex items-center gap-1 text-sm font-medium underline 2xl:text-base underline-offset-2"
                  >
                    {expanded ? t('collapse') : t('view-more')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="relative space-y-3 text-justify text-sm font-normal text-[#09090B] xl:space-y-4 xl:text-base 2xl:space-y-5 3xl:space-y-6"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
      </div>
    </section>
  );
}

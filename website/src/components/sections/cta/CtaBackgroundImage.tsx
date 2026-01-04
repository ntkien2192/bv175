'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useEffect, useMemo, useState } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Fancybox from '../../common/Fancybox';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function CtaBackgroundImage({ data }: CommonSection) {
  const metadata = useMetadata();
  const contact_information = metadata?.contact_information;
  const t = useTranslations('Contact');

  const dataContact = useMemo(
    () => [
      {
        title: t('phone'),
        icon: '',
        url: contact_information?.hot_line_url || '/',
        content: contact_information?.hot_line,
        isTargetBlank: false,
      },
      {
        title: t('book-via-zalo'),
        icon: '',
        url: contact_information?.medical_appointment_url || '/',
        content: contact_information?.medical_appointment,
        isTargetBlank: true,
      },
      {
        title: t('book-via-app'),
        icon: '/assets/icons/icon_bv_contact.svg',
        url: contact_information?.googleplay_url || '/',
        content: '',
        isTargetBlank: true,
      },
      {
        title: t('email'),
        icon: '',
        list: [
          {
            url: contact_information?.email_url || '/',
            content: contact_information?.email,
          },
          {
            url: contact_information?.email_ctxh_url || '/',
            content: contact_information?.email_ctxh,
          },
        ],
        isTargetBlank: false,
      },
      {
        title: t('address'),
        icon: '',
        url: contact_information?.address_url || '/',
        content: contact_information?.address,
        isTargetBlank: true,
      },
    ],
    [contact_information],
  );

  const { paginationClass, paginationConfig } = useSwiperPagination();

  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px] 4xl:py-[120px]">
      <div className="container space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-14 3xl:space-y-[60px]">
        <div className="space-y-1 text-center">
          <div className="section-sub-title">{data?.subtitle}</div>

          <h1
            className="section-title mt-1"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></h1>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[52px] 4xl:gap-[60px]">
          <div className="hidden lg:order-2 lg:block">
            {data?.cover?.length > 0 && paginationConfig && paginationClass ? (
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
                      {data?.cover?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                          <Link
                            href={getAssetUrlById(item?.id)}
                            data-fancybox="gallery"
                            className="relative block size-full"
                          >
                            <NextImg
                              src={getAssetUrlById(item?.id)}
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

          <div className="relative space-y-6 md:space-y-7 lg:order-1 xl:space-y-8 3xl:space-y-9 4xl:space-y-10">
            {dataContact?.map((item: any, index: number) => (
              <div key={index} className="space-y-1">
                {/* Title */}
                <div className="text-sm font-medium text-[#52525B] lg:text-base 2xl:text-lg">
                  {item?.title}
                </div>

                {/* Nếu có list (ví dụ email có nhiều link) */}
                {item?.list ? (
                  <div className="flex flex-col gap-1">
                    {item.list.map((sub: any, subIndex: number) => (
                      <a
                        key={subIndex}
                        href={sub?.url}
                        target={item?.isTargetBlank ? '_blank' : undefined}
                        rel={item?.isTargetBlank ? 'noopener' : undefined}
                        className="flex w-fit items-center gap-1 xl:gap-2"
                      >
                        {item?.icon && (
                          <div className="relative size-10 lg:size-11 2xl:size-12">
                            <NextImg src={item.icon} alt="icon contact" />
                          </div>
                        )}
                        <div className="text-base font-medium text-[#09090B] xl:text-xl 3xl:text-2xl">
                          {sub?.content}
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  /* Ngược lại nếu chỉ có 1 content */
                  <a
                    target={item?.isTargetBlank ? '_blank' : undefined}
                    rel={item?.isTargetBlank ? 'noopener' : undefined}
                    href={item?.url}
                    className="flex w-fit items-center gap-1 xl:gap-2"
                  >
                    {item?.icon && (
                      <div className="relative size-10 lg:size-11 2xl:size-12">
                        <NextImg src={item.icon} alt="icon contact" />
                      </div>
                    )}
                    <div className="text-base font-medium text-[#09090B] xl:text-xl 3xl:text-2xl">
                      {item?.content}
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

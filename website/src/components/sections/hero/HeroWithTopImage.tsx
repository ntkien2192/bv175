'use client';
import { CommonSection } from '@/src/types/pageBuilder';
import React, { useRef } from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import CustomLink from '../../common/custom-link';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

gsap.registerPlugin(useGSAP);

export default function HeroWithTopImage({ data }: CommonSection) {
  const containerRef = useRef<any>(null);
  const selector = gsap.utils.selector(containerRef);
  const { paginationClass, paginationConfig } = useSwiperPagination();
  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const handleSlideNextTransitionStart = contextSafe(
    (realIndex: number, previousRealIndex: number) => {
      gsap.set(selector('.slide'), {
        xPercent: 0,
      });
      gsap.from(selector(`.slide-${realIndex}`), {
        xPercent: -40,
        duration: 1,
        ease: 'power1.inOut',
      });
      gsap.to(selector(`.slide-${previousRealIndex}`), {
        xPercent: 40,
        duration: 1,
        ease: 'power1.inOut',
      });
    },
  );

  const handleSlidePrevTransitionStart = contextSafe(
    (realIndex: number, previousRealIndex: number) => {
      gsap.set(selector('.slide'), {
        xPercent: 0,
      });
      gsap.from(selector(`.slide-${realIndex}`), {
        xPercent: 40,
        duration: 1,
        ease: 'power1.inOut',
      });
      gsap.to(selector(`.slide-${previousRealIndex}`), {
        xPercent: -40,
        duration: 1,
        ease: 'power1.inOut',
      });
    },
  );

  return (
    <section>
      <div className="relative">
        <div
          ref={containerRef}
          className="relative hidden aspect-[3/2] h-auto w-full overflow-hidden md:aspect-[5/2] lg:block"
        >
          <Swiper
            touchEventsTarget="container"
            allowTouchMove={false}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            speed={1000}
            modules={[Pagination, Autoplay, Keyboard]}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              type: 'bullets',
              el: `.swiper-bullets-container.swiper-hero-bg-focus`,
              bulletElement: 'div',
            }}
            onSlideNextTransitionStart={(swiper: any) =>
              handleSlideNextTransitionStart(
                swiper.realIndex,
                swiper.previousRealIndex,
              )
            }
            onSlidePrevTransitionStart={(swiper: any) =>
              handleSlidePrevTransitionStart(
                swiper.realIndex,
                swiper.previousRealIndex,
              )
            }
            className="swiper-hero-background-focus h-full w-full"
          >
            {data?.items?.map((item: any, index: number) => (
              <SwiperSlide key={`cover-${index}`} className="!h-full !w-full">
                {item?.buttons?.[0]?.url ? (
                  <CustomLink
                    href={item?.buttons?.[0]?.url}
                    className="relative block h-full w-full overflow-hidden"
                  >
                    <div
                      className={`slide slide-${index} absolute inset-0 size-full`}
                    >
                      <SlideContent item={item} />
                    </div>
                  </CustomLink>
                ) : (
                  <div className="relative h-full w-full overflow-hidden">
                    <div
                      className={`slide slide-${index} absolute inset-0 size-full`}
                    >
                      <SlideContent item={item} />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute bottom-2 left-0 z-[5] flex w-full justify-center lg:bottom-4 xl:bottom-5 3xl:bottom-6">
            <div className="container relative w-fit">
              <div
                className={`swiper-bullets-container swiper-hero-bg-focus !pointer-events-auto !w-fit cursor-pointer`}
              ></div>
            </div>
          </div>
        </div>

        {paginationClass && paginationConfig && (
          <div className="relative block aspect-[3/2] h-auto w-full overflow-hidden md:aspect-[5/2] lg:hidden">
            <Swiper
              touchEventsTarget="container"
              allowTouchMove={true}
              loop={true}
              slidesPerView={1}
              spaceBetween={0}
              speed={500}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={paginationConfig}
              className="h-full w-full"
            >
              {data?.items?.map((item: any, index: number) => (
                <SwiperSlide key={`cover-${index}`} className="!h-full !w-full">
                  {item?.buttons?.[0]?.url ? (
                    <CustomLink
                      href={item?.buttons?.[0]?.url}
                      className="relative block h-full w-full overflow-hidden"
                    >
                      <SlideContent item={item} />
                    </CustomLink>
                  ) : (
                    <div className="relative h-full w-full overflow-hidden">
                      <SlideContent item={item} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="pointer-events-none absolute bottom-2 left-0 z-[5] flex w-full justify-center lg:bottom-4 xl:bottom-5 3xl:bottom-6">
              <div className="container relative w-fit">
                <div
                  className={`${paginationClass} !pointer-events-auto !w-fit cursor-pointer`}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {data?.buttons?.length > 0 && (
        <div className="py-10 md:py-6 2xl:py-8 4xl:py-10">
          <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 2xl:flex 2xl:items-stretch 3xl:gap-6">
            {data?.buttons?.map((button: any, index: number) => (
              <CustomLink
                key={index}
                href={button?.url}
                aria-label={button?.title}
                className="group flex items-center gap-3 bg-primary-50 p-[12px_24px] transition-colors duration-200 hover:bg-secondary md:p-[12px_40px] lg:p-[12px_80px] xl:p-[12px_120px] 2xl:flex-1 2xl:p-[12px_16px] 3xl:gap-4 3xl:p-[12px_20px] 4xl:p-[12px_24px]"
              >
                <div className="relative size-9 duration-200 group-hover:brightness-[0] group-hover:invert group-hover:saturate-[100%] md:size-8 xl:size-9 3xl:size-11 4xl:size-12">
                  <NextImg src={getAssetUrlById(button?.icon?.id)} alt="icon" />
                </div>

                <div className="flex-1">
                  {button?.title && (
                    <h2 className="text-lg font-semibold leading-[1.5] text-[#09090B] transition-colors duration-200 group-hover:text-white 2xl:text-xl 4xl:text-[22px]">
                      {button?.title}
                    </h2>
                  )}
                  <div className="text-sm font-normal text-[#3F3F46] transition-colors duration-200 group-hover:text-white/60">
                    {button?.blurb}
                  </div>
                </div>
              </CustomLink>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const SlideContent = ({ item }: any) => {
  return (
    <>
      <div className="absolute inset-0 z-[1] hidden size-full md:block">
        <NextImg
          src={getAssetUrlById(item?.cover?.id)}
          alt="media image"
          objectFit="cover"
          className="object-top"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 z-[1] size-full md:hidden">
        <NextImg
          src={getAssetUrlById(item?.content?.id)}
          alt="media image"
          objectFit="cover"
          className="object-top"
          loading="eager"
        />
      </div>

      <div className="absolute left-0 top-1/2 z-[2] w-full -translate-y-1/2">
        <div className="container relative z-[2] space-y-2 text-center xl:space-y-3 4xl:space-y-4">
          <div
            className="w-full text-sm font-normal text-[#E4E4E7] md:!leading-[1.4] lg:!leading-[1.5] xl:text-base 3xl:text-lg 3xl:!leading-[1.6] 4xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: item?.blurb,
            }}
          ></div>
          {item?.title && (
            <h2
              className="text-[30px] font-bold !leading-[1.4] text-white md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]"
              dangerouslySetInnerHTML={{
                __html: item?.title,
              }}
            ></h2>
          )}

          <div
            className="w-full text-sm font-normal text-[#E4E4E7] md:!leading-[1.4] lg:!leading-[1.5] xl:text-base 3xl:text-lg 3xl:!leading-[1.6] 4xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: item?.subtitle,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

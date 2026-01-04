'use client';
import React, { useEffect, useState } from 'react';
import { getAssetUrlById } from '@/src/utils/image';
import {
  DialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../../ui/dialog';
import { cn } from '@/src/lib/utils';
import { X } from 'lucide-react';
import Fancybox from '../../common/Fancybox';
import NextImg from '../../common/next-img';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from '@/src/i18n/navigation';
import useSwiperPagination from '@/src/hooks/useSwiperPagination';

export default function Card1ColDetail({ event, data }: any) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { paginationClass, paginationConfig } = useSwiperPagination();

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        {
          <div className="relative grid cursor-pointer grid-cols-1 gap-0 overflow-hidden rounded-[12px] border-[1px] border-primary-500 md:grid-cols-2 md:gap-4 lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-10">
            <div className="relative aspect-video w-full overflow-hidden">
              <NextImg
                src={getAssetUrlById(event?.images?.[0]?.directus_files_id)}
                alt="event cover"
                objectFit="cover"
              />
            </div>

            <div className="flex flex-col items-stretch justify-center p-3 lg:p-4">
              <div className="line-clamp-3 text-base font-semibold uppercase text-black/90 lg:text-lg 2xl:text-xl 2xl:!leading-[1.5] 3xl:text-2xl">
                {event?.title}
              </div>

              <div
                className="relative mt-1.5 line-clamp-3 h-[60px] overflow-hidden text-sm font-normal text-black lg:mt-2 xl:h-[72px] xl:text-base 2xl:mt-3 4xl:mt-4"
                dangerouslySetInnerHTML={{
                  __html: event?.blurb,
                }}
              ></div>

              <div className="flex items-center justify-between pt-3 lg:pt-4 2xl:pt-5 3xl:pt-6">
                <div className="flex items-center gap-1.5 xl:gap-2">
                  <div className="relative size-5 xl:size-6">
                    <NextImg
                      src="/assets/icons/calendar_gray.svg"
                      alt="calendar icon"
                    />
                  </div>
                  <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                    {event?.timestamp}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 xl:gap-2">
                  <p className="text-sm font-medium text-black lg:text-base 3xl:text-lg 4xl:text-xl">
                    {data?.buttons?.[0]?.title}
                  </p>

                  <div className="relative size-5 xl:size-6">
                    <NextImg
                      src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                      alt="arrow icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onScroll={(e) => e.stopPropagation()}
        className={cn('!scrollbar-hidden bg-black/50 p-0')}
      >
        <div className="hidden">
          <DialogTitle>Lịch sử hình thành</DialogTitle>
          <DialogDescription>Lịch sử hình thành </DialogDescription>
        </div>
        <div
          onClick={() => {
            setIsOpenModal(false);
          }}
          className="flex h-full w-full cursor-auto items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-[calc(100vw-0px)] overflow-y-auto rounded-[12px] bg-white p-[40px_20px_20px] md:h-[60vh] md:w-[70vw] md:p-[40px_24px_24px] lg:h-[80vh] lg:w-[50vw] xl:rounded-[14px] xl:p-[44px_28px_28px] 3xl:rounded-[16px] 3xl:p-[48px_32px_32px] 4xl:h-[800px] 4xl:w-[800px] 4xl:p-[52px_40px_40px]"
          >
            <DialogClose className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-0 top-0 p-[10px_10px] focus:outline-none disabled:pointer-events-none md:p-[10px_12px] xl:p-3 2xl:p-[12px_14px] 3xl:p-4">
              <X className="h-5 w-5 brightness-0" />
            </DialogClose>

            <div className="scrollbar-hidden relative size-full space-y-6 overflow-x-hidden overflow-y-scroll">
              <div className="w-full">
                {paginationConfig && paginationClass && (
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
                      className="relative aspect-video w-full overflow-hidden rounded-[6px] xl:rounded-[10px] 3xl:rounded-[12px]"
                    >
                      <Swiper
                        touchEventsTarget="container"
                        grabCursor={true}
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={12}
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
                        {event?.images?.map((image: any, index: number) => (
                          <SwiperSlide key={image?.directus_files_id}>
                            <Link
                              href={getAssetUrlById(image?.directus_files_id)}
                              data-fancybox="gallery"
                              className="relative block size-full overflow-hidden rounded-[6px] xl:rounded-[10px] 3xl:rounded-[12px]"
                            >
                              <NextImg
                                src={getAssetUrlById(image?.directus_files_id)}
                                objectFit="cover"
                                alt="facilities images"
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Fancybox>
                    <div className="relative mt-2 flex h-5 justify-center xl:mt-3 3xl:mt-4">
                      <div
                        className={`${paginationClass} !w-fit cursor-pointer`}
                      ></div>
                    </div>
                  </>
                )}
              </div>

              <div className="text-base font-semibold uppercase text-black/90 2xl:text-lg 3xl:text-xl">
                {event?.title}
              </div>

              <div className="h-[1px] bg-[#E8E8E8]"></div>
              <div
                className="space-y-2 text-sm font-medium text-[#6C6C71]"
                dangerouslySetInnerHTML={{
                  __html: event?.content,
                }}
              ></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

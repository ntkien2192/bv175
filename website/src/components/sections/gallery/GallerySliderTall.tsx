'use client';

import React, { useEffect, useState } from 'react';
import { CommonSection } from '@/src/types/pageBuilder';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ThePagination from '@/src/components/common/the-pagination';
import DialogVideo from '@/src/components/common/dialog-video';
import NextImg from '../../common/next-img';

// ===== CONFIG =====
const PAGE_SIZE = 6;

// ===== Youtube helpers =====
const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getThumbnail = (url?: string) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
};

export default function GallerySliderTall({ data }: CommonSection) {
  const items = data?.items || [];

  const [currentPage, setCurrentPage] = useState(1);

  // 🔑 dialog states
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // ===== Pagination =====
  const totalPage = Math.ceil(items.length / PAGE_SIZE);
  const pagedItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  if (!items.length) return null;

  const handleOpenVideo = (url: string) => {
    const id = getYoutubeId(url);
    if (!id) return;

    setCurrentVideoId(id);
    setIsOpenDialog(true);
  };

  return (
    <div className="py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <h1 className="container section-title text-center">{data?.title}</h1>

      {/* ===== MOBILE: SLIDER ===== */}
      <div className="mt-6 block md:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.15}
          speed={500}
          className="!px-6"
        >
          {pagedItems.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <ThumbnailItem
                item={item}
                onClick={() => handleOpenVideo(item?.blurb)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== DESKTOP: GRID ===== */}
      <div className="container mt-10 hidden grid-cols-2 gap-6 2xl:gap-7 md:grid lg:grid-cols-3 2xl:mt-14 4xl:gap-10">
        {pagedItems.map((item: any, index: number) => (
          <ThumbnailItem
            key={index}
            item={item}
            onClick={() => handleOpenVideo(item?.blurb)}
          />
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPage > 1 && (
        <div className="mt-10">
          <ThePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setPage={setCurrentPage}
          />
        </div>
      )}

      {/* ===== VIDEO DIALOG (SINGLE INSTANCE) ===== */}
      {currentVideoId && (
        <DialogVideo
          open={isOpenDialog}
          onToggle={setIsOpenDialog}
          videoUrl={currentVideoId}
          trigger={<span />} // trigger dummy vì control bằng state
        />
      )}
    </div>
  );
}

/* ===== Thumbnail ===== */
function ThumbnailItem({ item, onClick }: { item: any; onClick: () => void }) {
  const thumb = getThumbnail(item?.blurb);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer space-y-4 overflow-hidden rounded-sm border bg-primary-50 p-2 transition duration-100 hover:border-primary-600 lg:p-3 2xl:p-4"
    >
      <div className="relative aspect-video w-full">
        <NextImg src={thumb} alt={item?.title || ''} objectFit="cover" />

        {/* Play icon overlay (optional UX tốt) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-100 group-hover:opacity-100">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-600 p-6 text-white">
            ▶
          </div>
        </div>
      </div>

      <div className="line-clamp-3 min-h-[4em] text-sm font-medium leading-tight text-primary-1000 lg:text-lg 2xl:text-xl">
        {item?.title}
      </div>
    </div>
  );
}

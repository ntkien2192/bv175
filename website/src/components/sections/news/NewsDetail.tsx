'use client';
import NextImg from '@/src/components/common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { formatDate } from '@/src/utils/validate';
import { CommonSection } from '@/src/types/pageBuilder';
import Fancybox from '../../common/Fancybox';
import { useEffect } from 'react';
import { Link } from '@/src/i18n/navigation';

export default function NewsDetail({ data, dataDetail }: CommonSection) {

  useEffect(() => {
    const container = document.querySelector(
      '.content-wrapper.content-fancybox',
    );
    if (!container) return;

    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('data-fancybox')) {
        img.setAttribute('data-fancybox', 'gallery');
        img.setAttribute('data-src', img.getAttribute('src') || '');
        img.style.cursor = 'pointer';
      }
    });
  }, [dataDetail]);


  return (
    <section className="container my-10 lg:my-12 2xl:my-[72px] 3xl:my-20">
      <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:mt-10 lg:grid-cols-[auto,260px] lg:gap-8 lg:px-6 xl:gap-11 xl:px-[60px] 2xl:gap-12 2xl:px-[100px] 3xl:gap-[60px] 3xl:px-[80px] 4xl:mt-[60px] 4xl:px-[160px]">
        {/* Main content */}
        <div className="space-y-4 md:space-y-6">
          {/* Cover */}
          <div className="relative aspect-video w-full">
            <NextImg
              src={getAssetUrlById(dataDetail?.cover)}
              alt={`${dataDetail?.title}`}
              objectFit="cover"
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            {/* Date published */}
            <div className="flex items-center gap-1.5 text-sm text-black lg:text-base 2xl:gap-2 2xl:text-lg 4xl:text-xl">
              <div className="relative size-5 lg:size-6">
                <NextImg
                  src="/assets/icons/calendar_black.svg"
                  alt="calendar"
                />
              </div>
              {formatDate(dataDetail?.date_published)}
            </div>

            {/* title */}
            <h1
              className="mb-5 text-lg font-bold !leading-normal text-primary-600 lg:mb-6 lg:text-2xl xl:mb-7 xl:text-[28px] 3xl:mb-8 3xl:text-[30px] 4xl:text-[32px]"
              dangerouslySetInnerHTML={{
                __html: dataDetail?.title,
              }}
            ></h1>
          </div>

          {/* Blurb */}
          <div
            className="text-sm font-bold text-gray-950 lg:text-base 3xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: dataDetail?.blurb,
            }}
          ></div>

          {/* content */}
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
              className="content-wrapper content-fancybox !text-sm font-normal text-gray-950 lg:!text-base 3xl:!text-lg"
              dangerouslySetInnerHTML={{
                __html: dataDetail?.content,
              }}
            ></div>
          </Fancybox>

          {dataDetail?.files && dataDetail?.files?.length > 0 && (
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
              <div className='grid grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-4 2xl:mt-5 xl:mt-4 md:mt-3 mt-2'>
                {dataDetail?.files?.map((item: any, index: number) => (
                  <Link
                    key={index}
                    href={getAssetUrlById(item?.directus_files_id)}
                    data-fancybox="gallery"
                    className='relative block overflow-hidden aspect-square'                >
                    <NextImg src={getAssetUrlById(item?.directus_files_id)} alt='gallery' objectFit='cover' />
                  </Link>
                ))}
              </div>
            </Fancybox>
          )}

        </div>

        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}

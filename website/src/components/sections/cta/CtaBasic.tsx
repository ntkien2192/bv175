'use client';
import Link from 'next/link';
import React from 'react';
import NextImg from '../../common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';

export default function CtaBasic({ data }: CommonSection) {
  const metadata = useMetadata();
  const contact_information = metadata?.contact_information;

  return (
    <section className="relative bg-[#155628] py-[60px] md:py-10 xl:py-12 2xl:py-14 3xl:py-[60px] 4xl:py-[70px]">
      <div className="container flex items-center gap-5 lg:gap-7 xl:gap-10 2xl:gap-12 3xl:gap-[52px] 4xl:gap-[60px]">
        <div className="basis-full space-y-4 md:basis-1/2 md:space-y-5 xl:space-y-6 3xl:space-y-8">
          <Link
            href={'/'}
            aria-label="Chuyển đến trang chủ"
            className="relative block h-10 w-[178px] lg:h-[60px] lg:w-[266px]"
          >
            <NextImg
              src="/assets/logo/secondary_logo.svg"
              alt="175 hospital logo"
            />
          </Link>

          <div
            className="section-title font-extrabold leading-[1.3] text-white"
            dangerouslySetInnerHTML={{
              __html: data?.title,
            }}
          ></div>

          <div className="relative w-full p-[16px_44px_16px_16px] lg:p-[20px_60px_20px_20px] 2xl:p-[20px_80px_20px_20px] 3xl:p-[20px_100px_20px_20px]">
            <div
              className="absolute inset-0 size-full opacity-90 !blur-[6px]"
              style={{
                clipPath: 'polygon(100% 0, 90% 50%, 100% 100%, 0 100%, 0 0)',
                background:
                  'linear-gradient(-90deg, #0EAE1D 7.98%, rgba(21, 86, 40, 0.00) 128.58%)',
              }}
            ></div>

            <div
              className="section-content relative z-[1] font-medium text-white/90 underline-offset-2"
              dangerouslySetInnerHTML={{
                __html: data?.blurb,
              }}
            ></div>
          </div>

          <a
            href={`${contact_information?.hot_line_url || '/'}`}
            className="btn-danger relative"
          >
            {data?.buttons?.[0]?.title}
            <div className="relative size-5">
              <NextImg
                src={getAssetUrlById(data?.buttons?.[0]?.icon?.id)}
                alt="phone icon"
              />
            </div>
          </a>
        </div>

        <div className="hidden basis-1/2 justify-end md:flex">
          <div className="relative aspect-[9/10] w-[80%] lg:w-[60%]">
            <NextImg
              src={getAssetUrlById(data?.cover?.[0]?.id)}
              objectFit="cover"
              alt="cta image"
            />

            <div className="absolute bottom-0 left-0 z-[1] hidden w-[90%] translate-x-[-65%] border-r-[16px] border-t-[16px] border-[#155628] lg:block xl:border-r-[20px] xl:border-t-[20px]">
              <div className="relative aspect-[8/5] w-full">
                <NextImg
                  src={getAssetUrlById(data?.cover?.[1]?.id)}
                  objectFit="cover"
                  alt="cta image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[0] size-full">
        <NextImg
          src={'/assets/images/cta_background.png'}
          objectFit="cover"
          alt="cta image"
        />
      </div>
    </section>
  );
}

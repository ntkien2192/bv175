'use client';
import CustomLink from '@/src/components/common/custom-link';
import NextImg from '@/src/components/common/next-img';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import React from 'react';

export default function EmbeddedMap({ data }: CommonSection) {
  const buttonViewMap = data?.buttons?.[0] || {};
  const buttonViewMap360 = data?.buttons?.[1] || {};
  return (
    <section className="container py-10 md:py-6 lg:py-10 xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
      <h2 className="section-title mt-2 text-center">{data.title}</h2>

      <div
        className="section-content mx-auto text-justify"
        style={data?.custom ?? {}}
        dangerouslySetInnerHTML={{
          __html: data?.blurb,
        }}
      ></div>

      <div className="mb-2 mt-6 flex justify-end md:mt-8 lg:mt-10 xl:mt-12">
        <CustomLink
          href={buttonViewMap?.url || '#'}
          className="font-normal italic text-primary-500"
        >
          {buttonViewMap?.title}
        </CustomLink>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.cover,
        }}
      ></div>

      <p className="section-title my-10 md:my-14 xl:my-16 3xl:my-[72px] 4xl:my-20 text-center">{data?.subtitle}</p>

      <CustomLink
        href={buttonViewMap360?.url}
        className="relative block aspect-video"
      >
        <NextImg
          src={getAssetUrlById(buttonViewMap360?.icon?.id)}
          alt="map-360"
        />
      </CustomLink>
    </section>
  );
}

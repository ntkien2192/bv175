import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import React from 'react';
import CustomLink from '../../common/custom-link';

export default function PDFViewer({ data }: CommonSection) {
  const url = getAssetUrlById(data?.cover?.[0]?.id);
  const button = data?.buttons?.[0];

  return (

    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[auto,220px] md:flex-row lg:grid-cols-[auto,260px] lg:gap-8 xl:gap-11 2xl:gap-12 3xl:gap-[60px]">
        <div className="space-y-8">
          {data?.title && (
            <h1 className="text-[24px] font-bold text-primary-600 md:text-[28px] xl:text-[32px] 4xl:text-[32px]">
              {data?.title}
            </h1>
          )}

          {button && (
            <CustomLink
              href={button.url}
              className="flex h-[50px] w-fit items-center justify-center rounded-md bg-primary-700 px-[20px] text-center text-[16px] font-bold text-white md:px-[40px] md:text-[18px] xl:px-[50px] xl:text-[20px]"
            >
              {button.title}
            </CustomLink>
          )}

          <div style={{ height: '90vh', width: '100%' }}>
            <iframe
              src={`${url}#toolbar=1&navpanes=0&scrollbar=0`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
        {/* Sidebar */}
        <div className="sidebar-container relative"></div>
      </div>
    </section>
  );
}

import React from 'react';
import NextImg from '../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';
import CustomLink from '../common/custom-link';
import { useTranslations } from 'next-intl';

type DepartmentCardProps = {
  item: any;
  url: string;
  blurb?: 'organizational_structure' | 'description';
  type?: 'default' | 'search';
};
export default function DepartmentCard({
  item,
  url = '/',
  blurb = 'description',
  type = 'default',
}: DepartmentCardProps) {
  const t = useTranslations('Common');

  const renderSearch = () => (
    <CustomLink
      href={`${url}/${item?.slug}`}
      aria-label="Xem chi tiết đơn vị"
      className="block space-y-1"
    >
      <div className="line-clamp-2 text-base font-semibold !leading-[1.6] text-primary-1000 underline underline-offset-2 duration-200 group-hover:text-primary-50 md:text-lg xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
        {item?.title} {item?.code && ` (${item.code})`}
      </div>
      <div
        className="line-clamp-2 text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100 xl:text-base"
        dangerouslySetInnerHTML={{
          __html: item?.blurb,
        }}
      ></div>
    </CustomLink>
  );

  const renderDefault = () => (
    <CustomLink
      href={`${url}/${item?.slug}`}
      aria-label="Xem chi tiết khối cơ quan hành chính"
      className="group relative flex cursor-pointer flex-col justify-between gap-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 md:h-full xl:p-4"
    >
      {/* cover */}
      <div className="space-y-4">
        <div className="relative aspect-video">
          <NextImg
            src={getAssetUrlById(item?.cover?.id || item?.cover)}
            alt="admin department cover"
            objectFit="cover"
          />
        </div>

        <div className="space-y-1">
          <div className="text-lg font-semibold !leading-[1.5] text-primary-1000 duration-200 group-hover:text-primary-50 xl:text-xl 2xl:line-clamp-2 2xl:h-16 3xl:h-[66px] 3xl:text-[22px] 4xl:h-[72px] 4xl:text-2xl">
            {item?.title} {item?.code && ` (${item.code})`}
          </div>
          <div
            className="line-clamp-3 text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100"
            dangerouslySetInnerHTML={{
              __html: item?.blurb,
            }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-950 duration-200 group-hover:text-primary-50 2xl:text-base 3xl:text-lg">
            {t('view-detail')}
          </span>
          <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
            <NextImg
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
    </CustomLink>
  );

  switch (type) {
    case 'search':
      return renderSearch();
    default:
      return renderDefault();
  }
}

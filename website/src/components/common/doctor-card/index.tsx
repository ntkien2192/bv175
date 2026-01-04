'use client';
import React, { JSX } from 'react';
import NextImg from '../next-img';
import { getAssetUrlById } from '@/src/utils/image';
import { cn } from '@/src/lib/utils';
import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export interface DoctorCardProps {
  item: any;
  url: string;
  isLogo?: boolean;
  isHover?: boolean;
  bgColor?: string;
  type?: 'default' | 'search';
  avatarType: 'avatar' | 'uniform_avatar';
  subTitle:
    | 'specialty'
    | 'hospital_title'
    | 'department_title'
    | 'institute_title'
    | 'admin_department_title'
    | 'unit_title'
    | string;
  avatarRatio?: '2/3' | '5/6' | '3/4' | string;
  avatarOrigin?: 'center' | 'top' | 'left' | 'right' | 'bottom';
  textSize?: 'md' | 'xl';
  isRounded?: boolean;
  isLink?: boolean;
}

export default function DoctorCard({
  item,
  url = '/doi-ngu-bac-si',
  isLogo = true,
  isHover = true,
  bgColor = '#fff',
  type = 'default',
  avatarType = 'avatar',
  subTitle = 'specialty',
  avatarRatio = '2/3',
  avatarOrigin = 'center',
  textSize = 'md',
  isRounded = true,
  isLink = true,
}: DoctorCardProps) {
  const t = useTranslations('Doctor');

  const renderSubTitleByType: Record<DoctorCardProps['subTitle'], JSX.Element> =
    {
      specialty: <>{item?.specialty}</>,
      hospital_title: (
        <>
          {item?.hospital_title
            ? t(`hospital_title.${item.hospital_title}`, {
                defaultMessage: item.hospital_title,
              })
            : null}
        </>
      ),
      institute_title: (
        <>
          {item?.institute_title
            ? t(`institute_title.${item.institute_title}`, {
                defaultMessage: item.institute_title,
              })
            : null}
        </>
      ),
      department_title: (
        <>
          {item?.department_title
            ? t(`department_title.${item.department_title}`, {
                defaultMessage: item.department_title,
              })
            : null}
        </>
      ),
      admin_department_title: (
        <>
          {item?.admin_department_title
            ? t(`admin_department_title.${item.admin_department_title}`, {
                defaultMessage: item.admin_department_title,
              })
            : null}
        </>
      ),
      unit_title: (
        <>
          {item?.unit_title
            ? t(`admin_department_title.${item.unit_title}`, {
                defaultMessage: item.unit_title,
              })
            : null}
        </>
      ),
    };

  const avatarId = item?.[avatarType]?.id ?? item?.[avatarType];

  const renderDefault = () => {
    const cardContent = (
      <>
        <div
          className={cn(
            'relative w-full overflow-hidden',
            isRounded && 'rounded-[8px]',
            isHover &&
              'transition-colors duration-200 group-hover:!border-primary-600 border-[2px] 2xl:border-[3px] border-transparent',
          )}
          style={{
            aspectRatio: avatarRatio,
            backgroundColor: bgColor,
          }}
        >
          <NextImg
            src={getAssetUrlById(avatarId)}
            alt="Doctor image"
            objectFit="cover"
            className="z-[2]"
          />

          {isLogo && (
            <NextImg
              src="/assets/images/doctor_card_bg.png"
              alt="doctor card bg image"
              objectFit="cover"
              className="z-[1] origin-center"
            />
          )}
        </div>

        <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
          <div
            className={cn(
              'font-normal text-[#3F3F46]',
              textSize === 'md' && 'text-xs md:text-sm 2xl:text-base',
              textSize === 'xl' && 'text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg',
            )}
          >
            {item?.full_title}
          </div>

          <div
            className={cn(
              'text-nowrap font-bold text-[#010502]',
              textSize === 'md' &&
                'text-base md:text-lg 2xl:text-xl 3xl:text-[22px] 4xl:text-2xl',
              textSize === 'xl' &&
                'text-base md:text-xl lg:text-lg xl:text-xl 2xl:text-[22px] 3xl:text-2xl',
            )}
          >
            {item?.full_name}
          </div>

          <div
            className={cn(
              'font-medium text-primary-500',
              textSize === 'md' && 'text-xs md:text-sm 2xl:text-base',
              textSize === 'xl' && 'text-xs md:text-base lg:text-sm xl:text-base 2xl:text-lg',
            )}
          >
            {renderSubTitleByType[subTitle]}
          </div>
        </div>
      </>
    );

    if (isLink) {
      return (
        <Link
          href={`${url}/${item?.slug}`}
          aria-label="Xem chi tiết bác sĩ"
          className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
        >
          {cardContent}
        </Link>
      );
    }
    return (
      <div className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4">
        {cardContent}
      </div>
    );
  };

  const renderSearch = () => {
    const cardContent = (
      <div className="xl:space-y-[2px] 3xl:space-y-1">
        <div className="text-sm font-normal text-[#3F3F46] xl:text-base">
          {item?.full_title}
        </div>

        <div className="text-nowrap text-lg font-bold text-[#010502] underline underline-offset-2 lg:text-lg xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          {item?.full_name}
        </div>

        <div className="pt-[2px] text-sm font-medium text-primary-500 xl:text-base">
          {renderSubTitleByType[subTitle]}
        </div>
      </div>
    );
    if (isLink) {
      return (
        <Link
          href={`${url}/${item?.slug}`}
          aria-label="Xem chi tiết bác sĩ"
          className="group block"
        >
          {cardContent}
        </Link>
      );
    }
    return <div className="group block">{cardContent}</div>;
  };

  switch (type) {
    case 'search':
      return renderSearch();
    default:
      return renderDefault();
  }
}

import { CommonSection } from '@/src/types/pageBuilder';
import React, { JSX } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { getAssetUrlById } from '@/src/utils/image';
import { cn } from '@/src/lib/utils';
import NextImg from '@/src/components/common/next-img';
import { getDoctorTitles } from '@/src/utils/render-doctor-title';
import { Link } from '@/src/i18n/navigation';

export default function Team3Col({ data }: CommonSection) {
  if (!data) return null;

  const firstDoctor = data?.doctors?.[0];
  const otherDoctors = data?.doctors?.slice(1);

  return (
    <>
      {/* Banner */}
      <div className="bg-white py-10 lg:py-[60px] xl:py-[80px] 3xl:py-[120px]">
        <div className="container flex flex-col items-center gap-10">
          {/* ⭐ Doctor đứng đầu (Giám đốc) */}
          {firstDoctor && (
            <div className="flex w-full justify-center">
              <div className="w-full max-w-[240px] md:max-w-[300px] xl:max-w-[428px]">
                <DirectorCard item={firstDoctor} link={data?.buttons?.[0]?.url} />
              </div>
            </div>
          )}

          {/* ⭐ 6 người còn lại */}
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-12 xl:gap-14 4xl:gap-[116px]">
            {otherDoctors?.map((item: any, index: number) => (
              <DoctorCard
                key={index}
                item={item}
                avatarType="uniform_avatar"
                subTitle="hospital_title"
                isHover={false}
                isRounded={false}
                link={data?.buttons?.[0]?.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const DirectorCard = ({item, link }: { item: any, link: any }) => (
  <Link
    href={`${link}/${item?.slug}`}
    aria-label="Xem chi tiết bác sĩ"
    className="group block space-y-3 2xl:space-y-[14px] 3xl:space-y-4"
  >
    <div className="text-center xl:space-y-[2px] 3xl:space-y-1">
      {/* Học hàm / Học vị */}
      <div className="text-[14px] font-normal text-[#3F3F46] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
        {item?.full_title}
      </div>

      {/* Họ tên */}
      <div className="text-nowrap text-[20px] font-bold text-[#010502] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] 4xl:text-[44px]">
        {item?.full_name}
      </div>

      {/* Chức danh */}
      <div className="flex items-center justify-center gap-2 text-[16px] font-bold text-subTitle md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
        <img
          src="/assets/icons/primary_star.svg"
          alt="star"
          className="size-4 lg:size-5 xl:size-6"
        />
        {getDoctorTitles(item)[0]}
      </div>
    </div>

    <div
      className={cn(
        'relative mx-auto w-full overflow-hidden',
        'transition-colors duration-200',
      )}
      style={{ aspectRatio: 2 / 3 }}
    >
      <NextImg
        src={getAssetUrlById(item?.uniform_avatar?.id)}
        alt="Doctor image"
        objectFit="cover"
        className="z-[2]"
      />
      <NextImg
        src="/assets/images/doctor_card_bg.png"
        alt="doctor card bg image"
        objectFit="cover"
        className="z-[1] origin-center"
      />
    </div>
  </Link>
);

const hospitalTitleMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó Giám đốc',
  doctor: 'Bác sĩ điều trị',
};

interface DoctorCardProps {
  item: any;
  isLogo?: boolean;
  isHover?: boolean;
  bgColor?: string;
  avatarType: 'avatar' | 'uniform_avatar';
  subTitle: 'hospital_title' | string;
  avatarRatio?: '2/3' | '5/6' | '3/4' | string;
  avatarOrigin?: 'center' | 'top' | 'left' | 'right' | 'bottom';
  isRounded?: boolean;
  link: string;
}

function DoctorCard({
  item,
  isLogo = true,
  isHover = true,
  bgColor = 'bg-white',
  avatarType = 'avatar',
  subTitle = 'specialty',
  avatarRatio = '2/3',
  isRounded = true,
  link = "/"
}: DoctorCardProps) {

  const renderSubTitleByType: Record<DoctorCardProps['subTitle'], JSX.Element> =
    {
      specialty: <>{item?.specialty}</>,
      hospital_title: (
        <>{hospitalTitleMap[item?.hospital_title] ?? item?.hospital_title}</>
      ),
    };

  const avatarId = item?.[avatarType]?.id ?? item?.[avatarType];

  return (
    <Link
      href={`${link}/${item?.slug}`}
      aria-label="Xem chi tiết bác sĩ"
      className="sm:space-y-4 group block space-y-3 md:space-y-5 xl:space-y-[10px] 2xl:space-y-[14px] 3xl:space-y-4"
    >
      {/* IMAGE WRAPPER */}
      <div
        className={cn(
          'relative mx-auto w-full overflow-hidden',
          'sm:max-w-[180px] max-w-[150px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[280px] 2xl:max-w-[300px]',
          bgColor,
          isRounded && 'rounded-[8px]',
          isHover &&
            'transition-colors duration-200',
        )}
        style={{
          aspectRatio: avatarRatio,
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

      {/* TEXT */}
      <div className="sm:space-y-1 space-y-[2px] text-center xl:space-y-[2px] 3xl:space-y-1">
        {/* Full title */}
        <div className="sm:text-[14px] text-[12px] font-normal text-[#3F3F46] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
          {item?.full_title}
        </div>

        {/* Full Name */}
        <div className="sm:text-[18px] text-nowrap text-[16px] font-bold text-[#010502] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[36px] 4xl:text-[40px]">
          {item?.full_name}
        </div>

        {/* Sub title */}
        <div className="sm:text-[14px] text-[12px] font-medium text-subTitle md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[24px] 4xl:text-[24px]">
          {renderSubTitleByType[subTitle]}
        </div>
      </div>
    </Link>
  );
}

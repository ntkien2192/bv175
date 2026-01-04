import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import DoctorCard from '../../common/doctor-card';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Team4Col({ data }: CommonSection) {
  return (
    <div className="bg-white py-10 md:py-6 lg:py-10 xl:py-[60px] 3xl:py-[80px]">
      <div className="container grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-6 xl:gap-4 4xl:gap-x-4 4xl:gap-y-6">
        <div className="col-span-2 flex flex-col justify-center gap-4 2xl:gap-5 3xl:gap-6">
          {data?.title && (
            <h2 className="section-title uppercase text-primary-600">
              {data?.title}
            </h2>
          )}
          <div
            className="section-content text-justify"
            dangerouslySetInnerHTML={{
              __html: data?.blurb,
            }}
          ></div>
        </div>

        <div className="col-span-2 hidden xl:block"></div>

        {data?.doctors?.map((item: any, index: number) => (
          <div
            key={index}
            className={`${index === 0 ? 'col-span-full flex justify-center xl:col-span-2 xl:justify-end xl:pl-[100px]' : ''}`}
          >
            <div
              className={`${index === 0 ? 'w-1/2 md:w-[calc((100%-24px*2)/3)] xl:w-full' : ''}`}
            >
              <DoctorCard
                key={index}
                item={item}
                url={data?.buttons?.[0]?.url}
                avatarType="uniform_avatar"
                subTitle="hospital_title"
                isHover={false}
                isRounded={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

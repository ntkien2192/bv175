import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import NextImg from '../../common/next-img';
import { getAssetUrlById } from '@/src/utils/image';

export default function InfoCenterBlock({ data }: CommonSection) {
  return (
    <section className="relative h-[640px] w-full overflow-hidden md:h-[174px] lg:h-[232px] xl:h-[290px] 2xl:h-[326px] 3xl:h-[364px] 4xl:h-[436px]">
      <div className="absolute inset-0 z-[1] size-full md:hidden">
        <NextImg
          src={getAssetUrlById(data?.cover?.[0]?.id)}
          alt="banner image"
          objectFit="cover"
        />
      </div>

      <div className="absolute inset-0 z-[1] hidden size-full md:block">
        <NextImg
          src={getAssetUrlById(data?.cover?.[1]?.id)}
          alt="banner image"
          objectFit="cover"
        />
      </div>
    </section>
  );
}

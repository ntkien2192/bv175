'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import NextImg from '../next-img';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';
import NavHeader from './NavHeader';
import MobileMenu from './MenuMobile';
import CustomLink from '../custom-link';
import SearchHeader from './SearchHeader';
import LanguageBtn from './LanguageBtn';
import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function TheHeader() {
  const t = useTranslations('Href');
  const metadata = useMetadata();
  const contact_information = metadata?.contact_information;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value.trim());
      router.push(`${t('search')}?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <header className="fixed left-0 top-0 z-[100] w-full">
      <div className="bg-white py-[6px] shadow-md xl:py-2 2xl:py-[10px] 4xl:py-3">
        <div className="container relative flex items-center justify-between py-[6px] md:py-[5px] lg:py-0">
          <Link
            href={'/' as any}
            aria-label="Chuyển đến trang chủ"
            className="relative h-[40px] w-[230px] md:h-[46px] md:w-[274px] lg:h-[64px] lg:w-[382px] 2xl:h-[72px] 2xl:w-[430px] 4xl:h-[80px] 4xl:w-[478px]"
          >
            <NextImg
              src="/assets/logo/long_primary_logo.svg"
              alt="Military hospital logo"
            />
          </Link>

          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 2xl:gap-8 4xl:gap-10">
            {/* Start: medal*/}
            <CustomLink
              href={t('achievements')}
              className="hidden items-center gap-3 md:flex xl:gap-4 2xl:gap-5 4xl:gap-6"
            >
              {contact_information?.files?.length > 0 &&
                contact_information?.files?.map((file: any, index: number) => (
                  <div
                    className="relative h-[44px] w-[30px] lg:h-[52px] lg:w-[36px] xl:h-[56px] xl:w-[39px] 2xl:h-[64px] 2xl:w-[44px] 4xl:h-[72px] 4xl:w-[50px]"
                    key={index}
                  >
                    <NextImg
                      src={getAssetUrlById(file?.directus_files_id)}
                      alt="Military hospital"
                    />
                  </div>
                ))}
            </CustomLink>
            {/* End: medal*/}

            {/* Start: location + search + language */}
            <div className="flex flex-col items-center gap-[6px] 4xl:gap-2">
              <div className="flex items-center gap-4 md:gap-2 2xl:gap-3">
                <CustomLink
                  href={contact_information?.map_url}
                  title="Xem bản đồ"
                  className="hidden h-9 w-[52px] items-center justify-center rounded-[6px] bg-primary-600 hover:bg-primary-500 md:flex 2xl:h-10 2xl:w-[60px]"
                >
                  <div className="relative size-5 2xl:size-6">
                    <NextImg
                      src="/assets/icons/map_pin.svg"
                      alt="hospital location"
                    />
                  </div>
                </CustomLink>

                <SearchHeader handleSearch={handleSearch} />

                <MobileMenu handleSearch={handleSearch} />

                <LanguageBtn className="hidden xl:flex" />
              </div>

              <a
                href={`${contact_information?.hot_line_url || '/'}`}
                className="hidden text-lg font-medium text-primary-600 xl:block 2xl:text-xl 2xl:!leading-[1.6] 4xl:text-[22px] 4xl:!leading-[1.55]"
              >
                Hotline:{' '}
                <span className="text-[#E11E30]">
                  {contact_information?.hot_line}
                </span>
              </a>
            </div>
            {/* End: location + search + language */}
          </div>
        </div>
      </div>

      <div className="hidden w-full xl:block">
        <NavHeader />
      </div>
    </header>
  );
}

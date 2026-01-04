import { checkValueNull } from '@/src/utils/validate';

export const createSeoData = (seo: any) => {
  return {
    title: checkValueNull(seo?.meta_title, ''),
    keywords: Array.isArray(seo?.meta_keyword)
      ? seo?.meta_keyword.join(', ')
      : '',
    description: checkValueNull(seo?.meta_description, ''),
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: checkValueNull(seo?.meta_title, ''),
      title: checkValueNull(seo?.meta_title, ''),
      description: checkValueNull(seo?.meta_description, ''),
      images: seo?.meta_cover?.id
        ? [`${process.env.NEXT_PUBLIC_ASSETS_URL}${seo?.meta_cover?.id}`]
        : [],
      url: process.env.SITE_URL ?? '',
      type: 'website',
    },
    alternates: {
      canonical: process.env.SITE_URL ?? '',
      languages: {
        vi: `${process.env.SITE_URL}/vi`,
        en: `${process.env.SITE_URL}/en`,
      },
    },
    metadataBase: new URL(process.env.SITE_URL!),
  };
};

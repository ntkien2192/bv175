import { checkValueNull } from '@/src/utils/validate';
import { Locale } from 'next-intl';
import { routing } from '../i18n/routing';

export const createSeoData = (seo: any, locale: Locale = routing.defaultLocale) => {
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
      url: `${process.env.SITE_URL}/${locale}`,
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.SITE_URL}/${locale}`,
      languages: {
        vi: `${process.env.SITE_URL}/vi`,
        en: `${process.env.SITE_URL}/en`,
      },
    },
    metadataBase: new URL(process.env.SITE_URL!),
  };
};

export function cleanTranslationsDeep(data: any, locale: string): any {
  if (Array.isArray(data)) {
    // Lọc bỏ những phần tử null (tức là không có bản dịch phù hợp)
    return data
      .map((item) => cleanTranslationsDeep(item, locale))
      .filter(Boolean);
  }

  if (data && typeof data === "object") {
    const cleaned = { ...data };

    if (Array.isArray(cleaned.translations)) {
      const matched = cleaned.translations.find(
        (t: any) =>
          t?.languages_code?.code === locale ||
          t?.languages_code === locale
      );

      // ❌ Nếu KHÔNG có bản dịch phù hợp → loại bỏ hoàn toàn object này
      if (!matched) {
        return null;
      }

      // ✅ Nếu có bản dịch phù hợp → merge vào object gốc
      Object.assign(cleaned, matched);

      // Xóa trường translations cho gọn
      delete cleaned.translations;
    }

    // Đệ quy xử lý các trường con
    for (const key of Object.keys(cleaned)) {
      if (typeof cleaned[key] === "object") {
        cleaned[key] = cleanTranslationsDeep(cleaned[key], locale);
      }
    }

    return cleaned;
  }

  return data;
}




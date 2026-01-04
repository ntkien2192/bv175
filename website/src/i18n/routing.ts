import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always',
  localeCookie: true,
  alternateLinks: true,
  localeDetection: true,
  // pathnames: {
  //   '/[slug]': {
  //     en: '/[slug]'
  //   },
  //   '/doi-ngu-bac-si/[slug]': {
  //     en: '/doctors/[slug]'
  //   },
  // }
});

// chỉ dùng cho trang home
export const getLangSlug = async (
  locale: string,
  slug: string,
): Promise<string> => {
  return locale === routing.defaultLocale ? slug : `${slug}-${locale}`;
};

export function getLocalizedField<T extends Record<string, any>>(
  data: T,
  baseKey: string,
  lang: string,
): string {
  // Nếu ngôn ngữ mặc định là "vi" thì dùng baseKey
  if (lang === routing.defaultLocale) return data?.[baseKey] ?? '';

  const localizedKey = `${baseKey}_${lang}`;
  return data?.[localizedKey] ?? data?.[baseKey] ?? '';
}

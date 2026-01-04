import JsonLDProvider from '@/src/components/common/the-json-ld';
import { getLangSlug, routing } from '@/src/i18n/routing';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { createSeoData } from '@/src/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}
export const dynamic = 'force-dynamic';


export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const langSlug = await getLangSlug(locale, 'trang-chu');

  const data = await fnGetPageBySlug(langSlug);
  const seo = createSeoData(data?.seo) ?? {};
  return seo;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);


  const langSlug = await getLangSlug(locale, 'trang-chu');
  const pageContent = await fnGetPageBySlug(langSlug);
  const pageSchema = pageContent?.seo?.meta_schema;

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} />
    </>
  );
}

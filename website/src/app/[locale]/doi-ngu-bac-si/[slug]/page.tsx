import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { fnGetDoctorDetail } from '@/src/services/doctors';
import { getLangSlug } from '@/src/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  if (!slug || !idRegex.test(slug)) return notFound();

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const langSlug = await getLangSlug(locale, 'chi-tiet-bac-si');

  const data = await fnGetDoctorDetail({ collection: 'doctors', slug });
  const pageContent = await fnGetPageBySlug(langSlug);
  if (!data) notFound();

  const title = t('doctor.title', {
    name: checkValueNull(data?.full_name, ''),
  });

  const description = checkValueNull(data?.hospital_title, '');

  return {
    title,
    keywords: title,
    description,
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: title,
      title,
      description,
      images: pageContent?.seo?.meta_cover?.id
        ? [
            `${process.env.NEXT_PUBLIC_ASSETS_URL}${pageContent?.seo?.meta_cover.id}`,
          ]
        : [],
      url: process.env.SITE_URL ?? '',
      type: 'website',
    },
    alternates: {
      canonical: process.env.SITE_URL ?? '',
    },
    metadataBase: new URL(process.env.SITE_URL!),
  };
}

const NewsDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  const dataDetail = await fnGetDoctorDetail({ collection: 'doctors', slug });

  const langSlug = await getLangSlug(locale, 'chi-tiet-bac-si');
  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  if (!dataDetail) {
    notFound();
  }

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} pageDetail={dataDetail} />
    </>
  );
};

export default NewsDetailPage;

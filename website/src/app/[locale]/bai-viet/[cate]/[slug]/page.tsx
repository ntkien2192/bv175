import { getNewsDetail } from '@/src/services/news';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { checkValueNull } from '@/src/utils/validate';
import JsonLDProvider from '@/src/components/common/the-json-ld';
import PageBuilder from '@/src/page-builder';
import { fnGetPageBySlug } from '@/src/services/page';
import { getLangSlug } from '@/src/i18n/routing';

export const revalidate = 60;

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

  const data = await getNewsDetail({ collection: 'posts', slug, locale });
    const transContent = data?.translations?.[0];

  if (!transContent) notFound();

  const title = checkValueNull(transContent?.title, '');

  const description = checkValueNull(transContent?.blurb, '');

  const imageUrl = transContent?.thumbnail
    ? `${process.env.NEXT_PUBLIC_ASSETS_URL}${transContent.thumbnail}`
    : '/assets/images/open_graph.png';

  return {
    title,
    keywords: ['Bệnh viện Quân y 175', 'Military hospital 175"'],
    description,
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
      siteName: title,
      title,
      description,
      images: [imageUrl],
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
  const post = await getNewsDetail({ collection: 'posts', slug, locale });
  const langSlug = await getLangSlug(locale, 'chi-tiet-bai-viet');

  const pageContent = await fnGetPageBySlug(langSlug);

  const pageSchema = pageContent?.seo?.meta_schema;

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLDProvider pageSchema={pageSchema} />
      <PageBuilder pageContent={pageContent} pageDetail={post} />
    </>
  );
};

export default NewsDetailPage;

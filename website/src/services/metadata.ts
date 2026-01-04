import { directusClientWithRest } from '@/src/lib/directus';
import { readSingleton } from '@directus/sdk';
import { Locale } from 'next-intl';

async function getTopNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('top_navigation', {
      fields: ['*'],
      filter: { language: { _eq: locale } },
    }),
  );
}

async function getBottomNavigation(locale: Locale) {
  return directusClientWithRest.request(
    readSingleton('bottom_navigation', {
      fields: ['*'],
      filter: { language: { _eq: locale } },
    }),
  );
}

async function getSiteMetadata() {
  return directusClientWithRest.request(
    readSingleton('metadata', {
      fields: ['contact_information', 'header_script'],
    }),
  );
}

export async function fnGetMetadata(locale: Locale) {
  try {
    const [topNav, bottomNav, metadata] = await Promise.all([
      getTopNavigation(locale),
      getBottomNavigation(locale),
      getSiteMetadata(),
    ]);
    return {
      ...metadata,
      top_navigation: topNav?.[0]?.raw_content,
      bottom_navigation: bottomNav?.[0]?.raw_content,
    };
  } catch (error) {
    console.error('Error getting metadata:', error);
  }
}


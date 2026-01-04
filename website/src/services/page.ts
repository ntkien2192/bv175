import { directusClientWithRest } from '@/src/lib/directus';
import { readItem, readItems } from '@directus/sdk';

/* ============================
   GET PAGE CONTENT BY SLUG
============================ */
export const fnGetPageBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItem('pages', slug, {
        fields: ['raw_content'],
      }),
    );

    return res?.raw_content ?? null;
  } catch (error: any) {
    console.log(
      'Error getting page content: ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET PAGE SCHEMA BY SLUG
============================ */
export const fnGetSchemaBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItem('pages', slug, {
        fields: ['metadata'],
      }),
    );

    return res?.metadata ?? null;
  } catch (error: any) {
    console.log(
      'Error getting page schema: ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET ALL PAGE SLUGS
============================ */
export const fnGetAllPageSlug = async () => {
  try {
    const res = await directusClientWithRest.request(
      readItems('pages', {
        fields: ['slug'],
      }),
    );

    return res ?? [];
  } catch (error: any) {
    console.log(
      'Error getting page slugs: ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return [];
  }
};

/* ============================
   GET TOP NAV BY SLUG (REST)
============================ */
export const fnGetTopNavBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItem('top_navigation', slug, {
        fields: ['raw_content'],
      }),
    );

    return res?.raw_content ?? null;
  } catch (error: any) {
    console.log(
      'Error getting top navigation: ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

/* ============================
   GET BOTTOM NAV BY SLUG (REST)
============================ */
export const fnGetBottomNavBySlug = async (slug: string) => {
  try {
    const res = await directusClientWithRest.request(
      readItem('bottom_navigation', slug, {
        fields: ['raw_content'],
      }),
    );

    return res?.raw_content ?? null;
  } catch (error: any) {
    console.error(
      'Error getting bottom navigation:  ',
      error?.errors?.[0]?.message || error?.message || error,
    );
    return null;
  }
};

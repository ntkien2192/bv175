import { aggregate, readItem } from '@directus/sdk';
import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { Locale } from 'next-intl';

/** Lấy danh sách item - có bộ lọc/ phân trang */

export const getListNews = async ({
  category = '',
  collection,
  limit = 12,
  page = 1,
  sort = true,
  keyword = '',
  offset = 0,
  locale = routing.defaultLocale,
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  category?: string;
  offset?: number;
  locale?: Locale;
}) => {
  const filter: any = {};
  if (category) {
    filter.categories = {
      category: {
        translations: {
          languages_code: { _eq: locale },
          slug: {
            _eq: category,
          },
        },
      },
    };
  }

  // search theo content_plain của post_translations
  if (keyword) {
    filter.translations = {
      _and: [
        {
          languages_code: { _eq: locale },
        },
        {
          _or: [
            { title: { _icontains: keyword } },
            { blurb: { _icontains: keyword } },
            { content: { _icontains: keyword } },
            { content_plain: { _icontains: keyword } },
          ],
        },
      ],
    };
  }

  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page,
        limit,
        sort: sort ? '-date_published' : 'date_published',
        filter,
        fields: [
          'slug',
          'thumbnail',
          'date_published',
          'categories.category.translations.*',
          'translations.*',
        ],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
          categories: {
            category: {
              translations: {
                _filter: { languages_code: { _eq: locale } },
              },
            },
          },
        },
      }),
    );

    return res;
  } catch (error) {
    console.log('err in getListNews: ', error);
  }
};

/** Trả về tổng số item */
export const getTotalNewsCount = async ({
  collection,
  keyword,
  category,
  locale = routing.defaultLocale,
}: {
  collection: string;
  keyword?: string;
  category?: string;
  locale?: Locale;
}) => {
  try {
    const filter: any = {};

    if (category) {
      filter.categories = {
        category: {
          translations: {
            languages_code: { _eq: locale },
            slug: {
              _eq: category,
            },
          },
        },
      };
    }

    if (keyword) {
      filter.translations = {
        _and: [
          {
            languages_code: { _eq: locale },
          },
          {
            _or: [
              { title: { _icontains: keyword } },
              { blurb: { _icontains: keyword } },
              { content: { _icontains: keyword } },
              { content_plain: { _icontains: keyword } },
            ],
          },
        ],
      };
    }

    // Lấy tất cả id matching filter
    const response = await directusClientWithRest.request(
      aggregate(collection, {
        aggregate: { countDistinct: 'slug' },
        query: {
          filter,
        },
      }),
    );

    return (response?.[0]?.countDistinct as any)?.slug ?? 0;
  } catch (error) {
    console.log('Error fetching news count:', error);
    return 0;
  }
};

/** Lấy chi tiết bài viết bằng slug */
export const getNewsDetail = async ({
  collection,
  slug,
  locale = routing.defaultLocale,
}: {
  collection: string;
  slug: string;
  locale: Locale;
}) => {
  try {
    const filter = {
      translations: {
        languages_code: { _eq: locale },
        slug: {
          _eq: slug,
        },
      },
    };

    const res = await directusClientWithRest.request(
      readItems(collection, {
        filter,
        deep: {
          translations: {
            _filter: {
              _and: [
                {
                  slug: { _eq: slug },
                },
                {
                  languages_code: { _eq: locale },
                },
              ],
            },
          },
        },
        fields: [
          '*',
          'categories.category.translations.*',
          'translations.*',
          'files.*',
        ],
      }),
    );
    return res?.[0];
  } catch (error) {
    console.log('err in getNewsDetail: ', error);
  }
};

export const getNewsCategoryDetail = async ({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItem(collection, slug, {
        fields: ['*'],
      }),
    );
    return res;
  } catch (error) {
    console.log('err in getNewsCategoryDetail: ', error);
  }
};

export const fnGetCategoriesNews = async ({
  collection,
  limit = 20,
  category = '',
  locale = routing.defaultLocale,
}: {
  collection: string;
  limit?: number;
  category?: string;
  locale?: Locale;
}) => {
  try {
    const filter: any = {};
    if (category) {
      filter.translations = {
        languages_code: { _eq: locale },
        slug: {
          _eq: category,
        },
      };
    }

    const res = await directusClientWithRest.request(
      readItems(collection, {
        page: 1,
        limit,
        filter,
        fields: ['*', 'translations.*'],
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale },
            },
          },
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};

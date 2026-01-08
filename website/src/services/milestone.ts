import { aggregate, readItem } from '@directus/sdk';
import { directusClientWithRest } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';
import { Locale } from 'next-intl';
import { routing } from '../i18n/routing';

/** Lấy danh sách item - có bộ lọc/ phân trang */

export const getListMilestone = async ({
  collection,
  limit = 12,
  page = 1,
  keyword = '',
  locale = routing.defaultLocale
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  locale?: Locale;
}) => {
  const filter: any = {};

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
          ],
        },
      ],
    };
  } else {
    filter.translations = {
      languages_code: { _eq: locale },
    };
  }

  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page,
        limit,
        filter,
        fields: ['id', 'title', 'blurb', 'year', 'events.*.*', 'events.translations.*', 'translations.*'],
        sort: 'sort',
        deep: {
          events: {
            _sort: ['sort'],
            translations: {
              _filter: {
                languages_code: { _eq: locale },
              },
            },
          },
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
    console.log('err in getListMilestone: ', error);
  }
};

/** Trả về tổng số item */
export const getTotalMilestoneCount = async ({
  collection,
  keyword,
  locale = routing.defaultLocale
}: {
  collection: string;
  keyword?: string;
  locale?: Locale;

}) => {
  try {
    const filter: any = {};
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
            ],
          },
        ],
      };
    } else {
      filter.translations = {
        languages_code: { _eq: locale },
      };
    }

    // Lấy tất cả id matching filter
    const response = await directusClientWithRest.request(
      aggregate(collection, {
        aggregate: { countDistinct: 'id' },
        query: {
          filter,
        },
      }),
    );

    return (response?.[0]?.countDistinct as any)?.id ?? 0;
  } catch (error) {
    console.log('Error fetching getTotalMilestoneCount:', error);
    return 0;
  }
};

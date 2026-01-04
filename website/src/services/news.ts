import { aggregate, readItem } from '@directus/sdk';
import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';

/** Lấy danh sách item - có bộ lọc/ phân trang */

export const getListNews = async ({
  category = '',
  collection,
  limit = 12,
  page = 1,
  sort = true,
  keyword = '',
  offset = 0,
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
  category?: string;
  offset?: number;
}) => {
  const filter: any = {};
  if (category) {
    filter.categories = {
      category: {
        slug: {
          _eq: category,
        },
      },
    };
  }

  if (keyword) {
    filter._or = [
      {
        title: {
          _icontains: keyword,
        },
      },
      {
        blurb: {
          _icontains: keyword,
        },
      },
      {
        content: {
          _icontains: keyword,
        },
      },
      {
        content_plain: {
          _icontains: keyword,
        },
      },
    ];
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
          'title',
          'blurb',
          'thumbnail',
          'date_published',
          'categories.category.title',
          'categories.category.slug',
        ],
        // meta: 'filter_count',
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
}: {
  collection: string;
  keyword?: string;
  category?: string;
}) => {
  try {
    const filter: any = {};
    if (category) {
      filter.categories = {
        category: {
          slug: {
            _eq: category,
          },
        },
      };
    }

    if (keyword) {
      filter._or = [
        {
          title: {
            _icontains: keyword,
          },
        },
        {
          blurb: {
            _icontains: keyword,
          },
        },
        {
          content: {
            _icontains: keyword,
          },
        },
        {
          content_plain: {
            _icontains: keyword,
          },
        },
      ];
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
}: {
  collection: string;
  slug: string;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItem(collection, slug, {
        fields: [
          '*',
          'categories.category.title',
          'categories.category.slug',
          'files.*',
        ],
      }),
    );
    return res;
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

// fnGetCategoriesNews

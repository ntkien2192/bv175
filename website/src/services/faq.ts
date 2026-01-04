import { aggregate, readItem } from '@directus/sdk';
import { directusClientWithRest } from '@/src/lib/directus';
import { readItems } from '@directus/sdk';

/** Lấy danh sách item - có bộ lọc/ phân trang */

export const getListFaq = async ({
  collection,
  limit = 12,
  page = 1,
  keyword = '',
}: {
  collection: string;
  limit?: number;
  page?: number;
  sort?: boolean;
  keyword?: string;
}) => {
  const filter: any = {};
  if (keyword) {
    filter._or = [
      {
        question: {
          _icontains: keyword,
        },
      },
      {
        answer: {
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
        filter,
        fields: ['question', 'answer'],
        disableCache: true,
      }),
    );

    return res;
  } catch (error) {
    console.log('err in getListFaq: ', error);
  }
};

/** Trả về tổng số item */
export const getTotalFaqCount = async ({
  collection,
  keyword,
}: {
  collection: string;
  keyword?: string;
}) => {
  try {
    const filter: any = {};
    if (keyword) {
      filter._or = [
        {
          question: {
            _icontains: keyword,
          },
        },
        {
          answer: {
            _icontains: keyword,
          },
        },
      ];
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
    console.log('Error fetching getTotalFaqCount:', error);
    return 0;
  }
};

import { directusClientWithRest } from '@/src/lib/directus';
import { aggregate, readItem, readItems } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { Locale } from 'next-intl';

export const fnGetAdminDepartments = async ({
  collection,
  limit = 12,
  page = 1,
  keyword = '',
  locale = routing.defaultLocale
}: {
  collection: string;
  limit?: number;
  page?: number;
  keyword?: string;
  locale?: Locale
}) => {
  const filter: any = {};
  if (keyword) {
    filter._or = [
      {
        title: {
          _icontains: keyword,
        },
      },
      {
        code: {
          _icontains: keyword,
        },
      },
      {
        description: {
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
        fields: [
          'slug',
          'title',
          'code',
          'cover.id',
          'organizational_structure',
          'description',
        ],
        filter,
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in GetAdminDepartments: ', error);
  }
};

export const getTotalAdminDepartmentCount = async ({
  collection,
  keyword,
  locale = routing.defaultLocale
}: {
  collection: string;
  keyword?: string;
  locale?: Locale
}) => {
  try {
    const filter: any = {};
    if (keyword) {
      filter._or = [
        {
          title: {
            _icontains: keyword,
          },
        },
        {
          code: {
            _icontains: keyword,
          },
        },
        {
          description: {
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
    console.log('Error fetching getTotalAdminDepartmentCount:', error);
    return 0;
  }
};

export const fnGetAdminDepartmentDetail = async ({
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
          'description_images.*',
          'achievements_images.*',
          'facilities_images.*',
          'technologies_images.*',
          'activities_images.*',
          'leaders.*.*',
        ],
        deep: {
          leaders: {
            sort: ['sort'],
          },
        },
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get GetAdminDepartmentDetail: ', error);
  }
};

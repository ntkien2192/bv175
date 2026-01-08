import { directusClientWithRest } from '@/src/lib/directus';
import { aggregate, readItem, readItems } from '@directus/sdk';
import { routing } from '../i18n/routing';
import { Locale } from 'next-intl';

export const getListDoctors = async ({
  limit = 6,
  page = 1,
  sort = ['full_name'],
  keyword,
  letter,
  departmentId,
}: {
  limit?: number;
  page?: number;
  sort?: string[];
  keyword?: string;
  letter?: string;
  departmentId?: string | number;
}) => {
  try {
    // Build filter động theo điều kiện
    const filter: any = {
      is_admin: {
        _neq: true,
      },
    };

    // 1. Keyword search
    if (keyword) {
      filter.full_name = {
        _icontains: keyword,
      };
    }

    // 2. Search theo chữ cái
    if (letter) {
      filter.searched_name = {
        _starts_with: letter.toLocaleLowerCase(),
      };
    }

    // 3. Filter theo khoa
    if (departmentId) {
      filter.departments = {
        department: {
          slug: {
            _eq: departmentId,
          },
        },
      };
    }

    const res = await directusClientWithRest.request(
      readItems('doctors', {
        fields: [
          '*',
          'departments.department.code',
          'departments.department.title',
          'department_groups.department_groups_slug.title',
        ],
        limit,
        page,
        sort,
        filter,
      }),
    );

    return res;
  } catch (error) {
    console.log('Err in getListDoctors: ', error);
  }
};

export const getDoctorsCount = async ({
  keyword,
  letter,
  departmentId,
}: {
  keyword?: string;
  letter?: string;
  departmentId?: string | number;
}) => {
  try {
    // Build filter giống getListDoctors
    const filter: any = {
      is_admin: {
        _neq: true,
      },
    };

    // 1. Keyword search
    if (keyword) {
      filter.full_name = { _icontains: keyword };
    }

    // 2. Search theo chữ cái
    if (letter) {
      filter.searched_name = { _starts_with: letter.toLocaleLowerCase() };
    }

    // 3. Filter theo khoa
    if (departmentId) {
      filter.departments = {
        department: {
          slug: {
            _eq: departmentId,
          },
        },
      };
    }

    // Gọi API với limit = 1, page = 1, chỉ cần meta.total_items
    // const res = await directusClientWithRest.request(
    //   readItems('doctors', {
    //     fields: ['slug'],
    //     filter,
    //   }),
    // );
    const response = await directusClientWithRest.request(
      aggregate('doctors', {
        aggregate: { countDistinct: 'slug' },
        query: {
          filter,
        },
      }),
    );

    // Trả về số lượng bản ghi
    // return res?.length ?? 0;
    return (response?.[0]?.countDistinct as any)?.slug ?? 0;
  } catch (error) {
    console.log('Err in getDoctorsCount: ', error);
    return 0;
  }
};

export const getListDoctorPreview = async ({
  collection,
  limit = 9,
  page = 1,
  keyword,
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
        full_name: {
          _icontains: keyword,
        },
      },
      {
        full_title: {
          _icontains: keyword,
        },
      },
      {
        specialty: {
          _icontains: keyword,
        },
      },
      {
        departments: {
          department: {
            title: {
              _icontains: keyword,
            },
          },
        },
      },
    ];
  }
  filter.is_admin = {
    _neq: true,
  }

  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        fields: ['slug', 'avatar', 'full_title', 'full_name', 'specialty'],
        limit: limit,
        page: page,
        filter,
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getAllDoctors: ', error);
  }
};

export const getTotalDoctorCount = async ({
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
          full_name: {
            _icontains: keyword,
          },
        },
        {
          full_title: {
            _icontains: keyword,
          },
        },
        {
          specialty: {
            _icontains: keyword,
          },
        },
        {
          departments: {
            department: {
              title: {
                _icontains: keyword,
              },
            },
          },
        },
      ];
    }
    filter.is_admin = {
      _neq: true,
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
    console.log('Error fetching doctor count:', error);
    return 0;
  }
};

export const getDoctorBySlug = async (slug: string) => {
  try {
    // Lấy chi tiết bác sĩ - collection: doctors - key: slug - options: lấy tất cả fields (*), lấy tất cả fields của khoa (department.*)
    const res = await directusClientWithRest.request(
      readItem('doctors', slug, {
        fields: ['*', 'departments.*'],
      }),
    );
    return res;
  } catch (error) {
    console.log('Err in getDoctorBySlug: ', error);
  }
};

export const fnGetDoctorDetail = async ({
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
          'departments.department.slug',
          'departments.department.title',
          'departments.department.code',
          'department_groups.department_groups_slug.title',
          'department_groups.department_groups_slug.slug',
          'department_groups.department_groups_slug.code',
          'department_groups.department_groups_slug.parent_group',
        ],
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};

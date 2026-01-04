import { readItem } from '@directus/sdk';
import { directusClient, directusClientWithRest } from '@/src/lib/directus';
import { parseFilterString } from '../utils/validate';
import { readItems } from '@directus/sdk';
import { customEndpoint } from '@directus/sdk';

export const fnGetListItemByEndpoint = async (endpoint: string) => {
  const data = await directusClientWithRest.request(
    customEndpoint<any>({
      path: `${endpoint}`,
      method: 'GET',
    }),
  );

  return data;
};

export const fnGetListitem = async ({
  collection,
  limit = 100,
}: {
  collection: string;
  limit?: number;
}) => {
  try {
    const res = await directusClientWithRest.request(
      readItems(collection, {
        page: 1,
        limit,
        fields: ['*'],
      }),
    );
    return res;
  } catch (error) {
    console.log('error in get data: ', error);
  }
};

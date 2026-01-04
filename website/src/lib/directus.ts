import { createDirectus, graphql, rest } from '@directus/sdk';

const directusClient = createDirectus(process.env.NEXT_PUBLIC_API_URL as string).with(graphql());
const directusClientWithRest = createDirectus(process.env.NEXT_PUBLIC_API_URL as string).with(rest());

export { directusClient, directusClientWithRest };




import { directusClient, directusClientWithRest } from "@/src/lib/directus";
import { createItem } from '@directus/sdk';


export type ApplicationLetter = {
  email: string
  fullName: string
  phoneNumber: string
  content: string
  fileId: string
  position: string
}

export type JobPositionsFetch = {
  page: number,
  limit: number,
  locationSlug: string | null,
  keyword: string | null,
  sort?: any | null,
}

export const fnGetJobPositionList = async (
  {
    page = 1,
    limit = 12,
    keyword = null,
    sort = true,
  }: JobPositionsFetch
) => {
  const filterConditions = [];

  if (keyword) {
    filterConditions.push(`{ title: { _icontains: "${keyword}" } }`);
  }

  const filterString = filterConditions.length
    ? `filter: { _and: [${filterConditions.join(', ')}] }`
    : '';
  try {
    const query = `
            query {
                job_positions (page: ${page}, limit: ${limit}, sort: "${sort == true ? '-date_published' : 'date_published'}" ${filterString ? `, ${filterString}` : ''}) {
                  raw_content
                }
                job_positions_aggregated ${filterString ? `(${filterString})` : ''} {
                    count {
                        slug
                    }
                }
            }
        `;

    return await directusClient.query(query);
  } catch (error) {
    console.log("Error getting job list: ", error)
  }

};

export const fnGetJobPostionBySlug = async (slug: string) => {
  try {
    const query = `
            query {
                job_positions_by_id (id: "${slug}") {
                    raw_content
                }
            }
        `
    const response = await directusClient.query(query)
    const pageContent = response?.job_positions_by_id?.raw_content
    return pageContent
  } catch (error) {
    console.log("Error getting job detail: ", error)
  }
}

export const fnSendApplicationLetter = async ({ email, fullName, phoneNumber, content, fileId, position }: ApplicationLetter) => {
  try {
    const response = await directusClientWithRest.request(createItem("application_letters", {
      "email": `${email}`,
      "full_name": `${fullName}`,
      "phone_number": `${phoneNumber}`,
      "content": `${content}`,
      "file": `${fileId}`,
      "position": `${position}`
    }));
    return response
  } catch (error) {
    console.log("Error sending application letter: ", error)
  }
}

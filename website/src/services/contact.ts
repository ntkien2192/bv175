import { directusClient } from "@/src/lib/directus";

export interface ContactInfo {
  title?: string | null
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const fnSendContact = async ({ title, name, email, phone, message }: ContactInfo) => {
  try {
    const query = `
        mutation {
            create_contact_tickets_item (data: {
              title: "${title?.trim()}",
              full_name: "${name?.trim()}",
              email: "${email?.trim()}",
              phone_number: "${phone?.trim()}",
              message: "${message?.trim()}",
            })
        }
    `;

    const response = await directusClient.query(query);
    return response?.create_contact_tickets_item
  } catch (error) {
    console.log("Error sending contact: ", error)
  }
}

export interface ReviewInfo {
  title?: string | null
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  rating: number | null;
}

export const fnSendReview = async ({ title, name, email, phone, message, rating }: ReviewInfo) => {
  try {
    const query = `
        mutation {
            create_quality_assessment_item (data: {
              title: "${title?.trim()}",
              full_name: "${name?.trim()}",
              email: "${email?.trim()}",
              phone_number: "${phone?.trim()}",
              message: "${message?.trim()}",
              rating: ${rating},
            })
        }
    `;

    const response = await directusClient.query(query);
    return response?.create_quality_assessment_item
  } catch (error) {
    console.log("Error sending review: ", error)
  }
}
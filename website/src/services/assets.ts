import { directusClientWithRest } from "@/src/lib/directus";
import { uploadFiles } from '@directus/sdk';


export const uploadFile = async (file: File | null) => {
  try {
    if (!file) return
    const formData = new FormData();
    formData.append("file", file);

    const result = await directusClientWithRest.request(uploadFiles(formData));

    const { id } = result;
    return id;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
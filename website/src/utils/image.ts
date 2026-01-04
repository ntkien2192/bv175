import { SETTINGS } from "@/src/utils/const"

const getAssetUrlById = (id: string, optionalString?: string) => {
  if (!id) return SETTINGS.DEFAULT_UNAVAILABLE_IMAGE_URL

  const imgUrl = process.env.NEXT_PUBLIC_ASSETS_URL + id
  if (optionalString) return imgUrl + optionalString
  return imgUrl
}

export { getAssetUrlById }
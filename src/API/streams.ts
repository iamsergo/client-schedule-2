import { BASE_URL } from "./constants"

export const getStreams = async () => {
  const url = `${BASE_URL}/streams`
  const res = await fetch(url)
  return res.json()
}
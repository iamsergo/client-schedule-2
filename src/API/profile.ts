import { BASE_URL } from "./constants"

export const requestEvents = async () => {
  const url = `${BASE_URL}/events`
  const res = await fetch(url)

  return await res.json()
}
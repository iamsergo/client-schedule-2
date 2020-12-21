import { BASE_URL } from "./constants"

export const getList = async () => {
  const url = `${BASE_URL}/list`
  const res = await fetch(url)
  return res.json()
}
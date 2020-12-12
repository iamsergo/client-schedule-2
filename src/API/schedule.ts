import { BASE_URL } from "./constants"

export const requestSchedule = async (href : string) => {
  const id = href.replace(/(\?|&)/g,'').replace('=','/')
  const url = `${BASE_URL}/schedule/${id}`
  const res = await fetch(url)
  
  return res.json()
}
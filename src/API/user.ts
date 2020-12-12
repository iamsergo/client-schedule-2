import { BASE_URL } from "./constants"

export const requestUser = async (id : number) => {
  const url = `${BASE_URL}/user/${id}`
  const res = await fetch(url)

  return res.json()
}

export const registerUser = async (id : number) => {
  const url = `${BASE_URL}/user/${id}`
  const opts = {
    method : 'POST', 
    headers : {'Content-Type': 'application/json;charset=utf-8'}
  }
  const res = await fetch(url, opts)

  return res.json()
}
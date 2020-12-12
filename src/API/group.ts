import { BASE_URL } from "./constants"

export const addGroup = async ({uid, group} : {uid : number, group : string}) => {
  const url = `${BASE_URL}/user/group`
  const opts = {
    method : 'PUT', 
    headers : {'Content-Type': 'application/json;charset=utf-8'},
    body : JSON.stringify({uid, group})
  }
  const res = await fetch(url, opts)

  return res.json()
}

export const delGroup = async (uid : number) => {
  const url = `${BASE_URL}/user/group`
  const opts = {
    method : 'DELETE', 
    headers : {'Content-Type': 'application/json;charset=utf-8'},
    body : JSON.stringify({uid})
  }
  const res = await fetch(url, opts)

  return res.json()
}
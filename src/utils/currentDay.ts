import { Day } from "../types/Day"

export const currentDay = () : Day => {
  const id = new Date().getDay()

  return (id > 0 ? id - 1 : id) as Day
}
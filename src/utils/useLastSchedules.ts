import { FromWhom } from "../types/ILesson"

export const useLastSchedules = (limit : number) => {
  const LAST_SCHEDULES = 'lastSchedules'

  const lsLast = localStorage.getItem(LAST_SCHEDULES)
  const last : FromWhom[] = lsLast ? JSON.parse(lsLast) : []

  const setLast = (s : FromWhom) => {
    const overloadFilter = (fw : FromWhom, i : number) =>
      fw.href.replace('&', '') !== s.href.replace('&', '') && i !== last.length - 1
    const normalFilter = (fw : FromWhom) => fw.href.replace('&', '') !== s.href.replace('&', '')

    const filterLast = last.filter(last.length < limit ? normalFilter : overloadFilter)    
    const newLast = [s, ...filterLast]

    localStorage.setItem(LAST_SCHEDULES, JSON.stringify(newLast))
  }

  return { last, setLast }
}
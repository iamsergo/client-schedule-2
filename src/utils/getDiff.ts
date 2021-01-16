import { PlainLesson, Coords } from "../types/PlainLesson"

export const getDiff = (a : PlainLesson[], b : PlainLesson[]) : PlainLesson[] => {  
  const isEqual = (a : Coords, b : Coords) : boolean => {
    const dayEqual = a.i === b.i
    const lessonNumEqual = a.j === b.j
    const weekEqual = a.z === b.z || a.z === 2 || b.z === 2
    const groupEqual = a.k === b.k || a.k === 2 || b.k === 2

    return dayEqual && lessonNumEqual && weekEqual && groupEqual
  }
  
  return a.filter(la => !b.find(lb => isEqual(la.coords, lb.coords)))
}
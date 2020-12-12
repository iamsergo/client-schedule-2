import { ILesson } from "../types/ILesson";
import { PlainLesson } from "../types/PlainLesson";
import { normalizeLesson } from "./normalizeLesson";

export const selectDay = (
  lessons : PlainLesson[],
  day : number,
  week : number
) : ILesson[] => {
  return lessons.filter(l => {
    const { i, z } = l.coords

    return i === day && (z === week || z === 2)
  }).map(normalizeLesson)
}
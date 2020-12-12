import { ILesson } from "../types/ILesson";
import { PlainLesson } from "../types/PlainLesson";
import { getTimeByLesson } from "./getTimeByLesson";

export const normalizeLesson = (lesson : PlainLesson) : ILesson => {
  const time = getTimeByLesson(lesson.coords.j)

  const group = lesson.coords.k !== 2 ? `(${lesson.coords.k + 1} гр.)` : ''

  return {
    place : lesson.place,
    type : lesson.type,
    subject : `${lesson.subject}${group}`,
    fromWhoms : lesson.fromWhoms,
    time,
  }
}
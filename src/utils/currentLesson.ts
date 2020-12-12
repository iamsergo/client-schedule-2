import { Day } from "../types/Day"
import { Week } from "../types/Week"
import { currentWeek } from "./currentWeek"

export const currentLesson = (time : string[], day : Day, week : Week) : boolean => {
  const now = new Date()

  if(now.getDay() === day + 1 && week === currentWeek())
  {
    const TEN_MIN = 10 * 60 * 1000

    const [start, end] = time    
    const [sh, sm] = start.split(':').map(d => +d)
    const lessonStart = new Date().setHours(sh, sm) - TEN_MIN
    const [eh, em] = end.split(':').map(d => +d)
    const lessonEnd = new Date().setHours(eh, em)

    const n = now.getTime()

    return lessonStart <= n && n <= lessonEnd
  }

  return false
}
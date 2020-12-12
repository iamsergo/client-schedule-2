import { Day } from "../types/Day";
import { Lesson } from "../types/Lesson";
import { PlainLesson } from "../types/PlainLesson";

interface ILesson
{
  lessonNum : Lesson
  children : PlainLesson[]
}

export interface IDay
{
  day : Day
  lessons : ILesson[]
}

export const fullSchedule = (schedule : PlainLesson[]) : IDay[] => {
  const data : IDay[] = []

  schedule.forEach((l,i) => {
    const dayId = l.coords.i
    const j = l.coords.j
    const lessonId = (j > 2 ? j - 1 : j) as Lesson
    
    if(!data[dayId])
      data[dayId] = { day : dayId, lessons : [] }
      
    if(!data[dayId].lessons[lessonId])
      data[dayId].lessons[lessonId] = { lessonNum: lessonId, children: [] }
      
    data[dayId].lessons[lessonId].children.push(l)
  })
  
  return data
}
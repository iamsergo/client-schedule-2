import {PlainLesson} from '../types/PlainLesson'
import weeks from '../data/weeks.json'
import { currentWeek } from './currentWeek'

export const wastedTime = (schedule : PlainLesson[]) => {
  const now = new Date()

  const cd = now.getDay()
  const currentDay = cd === 0 ? 6 : cd - 1

  const nowMs = now.getTime()
  const currentWeek = weeks.filter(({ date : [start, end] }) => start < nowMs && nowMs < end)[0].week

  const [w0,w1] = weeks.reduce((counts, w) : [number,number] => {
    const [start, end] = w.date
    
    return (start <= nowMs && nowMs <= end)
      ? counts.map((c,i) => i === w.week ? c + 1 : c) as [number,number]
      : counts as [number,number]
  },[0,0])

  const counts = schedule.reduce((total, lesson) : number => {
    const week = lesson.coords.z
    const day = lesson.coords.i

    let t = total

    if(week === 2) t += w0 + w1
    else if(week === 0) t += w0
    else if(week === 1) t += w1

    if(day <= currentDay && (week === currentWeek || week === 2)) t++

    return t
  },0)

  return (counts * 95) / 60
}
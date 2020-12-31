// import weeks from '../data/weeks.json'
import weeks from '../data/weeks_new.json'

import { FromWhom } from '../types/ILesson'
import { PlainLesson } from '../types/PlainLesson'

export const getStatsLesson = (subject : string, schedule : PlainLesson[]) => {
  const byWeek = [[0,0],[0,0],[0,0]]
  const fromWhoms : FromWhom[] = []

  const now = new Date()
  
  const dd = now.getDay()
  const currentDay = dd === 0 ? 6 : dd - 1
  
  const d = now.getTime()
  const currentWeekIndex = weeks.findIndex(({ date : [start, end] }) => start < d && d < end)
  

  schedule.forEach(l => {
    if(l.subject === subject)
    {
      weeks.forEach((w, i) => {
        const week = l.coords.z
        const day = l.coords.i
        const group = l.coords.k

        if(week === w.week || week === 2)
        {
          if(
            group !== 2 && (l.fromWhoms.length === 2 || week !== 2) ||
            group === 2
          )
            byWeek[l.type][1]++
          else
            byWeek[l.type][1] += 0.5

          if(
            i < currentWeekIndex ||
            i === currentWeekIndex && day <= currentDay
          )
          {
            if(
              group !== 2 && (l.fromWhoms.length === 2 || week !== 2) ||
              group === 2
            )
              byWeek[l.type][0]++
            else
              byWeek[l.type][0] += 0.5
          }
        }
      })

      l.fromWhoms.map(fw => {
        if(fromWhoms.find(_ => _.href === fw.href)) return

        fromWhoms.push(fw)
      })
    }
  })

  return {
    fromWhoms,
    stats : {
      lec : byWeek[0].map(Math.floor),
      pr  : byWeek[1].map(Math.floor),
      lab : byWeek[2].map(Math.floor),
    },
  }
}
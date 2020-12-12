import React from 'react'
import './FullSchedule.sass'

import { Card } from '@vkontakte/vkui'

import SingleCell from '../Cell/SingleCell'
import HalfCell from '../Cell/HalfCell'
import QuarterCell from '../Cell/QuarterCell'

import { IDay } from '../../utils/fullSchedule'
import { PlainLesson } from '../../types/PlainLesson'
import { currentDay, fullSchedule } from '../../utils'

interface FullScheduleProps
{
  schedule : PlainLesson[]
}

const HEADERS = [
  'Время',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
]

const TIME = [
  ['08:15', '09:50'],
  ['10:00', '11:35'],
  ['11:45', '12:35', '13:20','14:10'],
  ['14:20', '15:55'],
  ['16:05', '17:40'],
  ['17:50', '19:25'],
  ['19:35', '21:10'],
]

const FullSchedule : React.FC<FullScheduleProps> = ({
  schedule
}) => {
  const lastLessonNum = schedule.reduce((max : number, l) => {
    const j = l.coords.j
    const lessonNum = j > 2 ? j - 1 : j

    return lessonNum > max ? lessonNum : max
  }, 0)

  const full = fullSchedule(schedule)

  return(
    <div className="card__wrapper-vertical">
      <div className="card__wrapper-horizontal">
        <div
          className="card__container"
          style={{
            gridTemplateRows : `18px repeat(${lastLessonNum + 1},auto)`
          }}
        >
          {HEADERS.slice(0, full[full.length - 1].day + 2).map((h, i) => {
            const cn = (currentDay() + 1 === i) ? 'current' : ''

            return <div
              key={i}
              className={`card__cell card__cell-header ${cn}`}
              style={{ gridRow : 1, gridColumn : i + 1 }}
            >{h}</div>
          })}
          {TIME.slice(0, lastLessonNum + 1).map((time, i) => {
            return <div
              key={i}
              className="card__cell card__cell-time"
              style={{ gridRow : i + 2, gridColumn : 1 }}
            >
              {time.map((t, j) => {
                const cn = (i === 2 && (j === 1 || j === 3)) ? 'break-bottom' : ''

                return <div key={j} className={cn}>{t}</div>
              })}
            </div>
          })}
          {
            full.reduce((cells : React.ReactNode[], d : IDay) : React.ReactNode[] => {
              const lessons = d.lessons.map(l => {
                const column = d.day + 2
                const row = l.lessonNum + 2

                const isHalf = l.children[0].coords.z !== 2
                const isHalfQuarter = l.children[0].coords.k !== 2
                const isQuarter = isHalf && isHalfQuarter

                const key = Object.values(l.children[0].coords).reduce((k : string,c : number) : string => k + c ,'')

                if(isQuarter) return <QuarterCell key={key} column={column} row={row} lessons={l.children} />
                else if(isHalf) return <HalfCell key={key} column={column} row={row} lessons={l.children} />
                else if(isHalfQuarter) return <HalfCell key={key} column={column} row={row} lessons={l.children} />
                else return <SingleCell key={key} column={column} row={row} lesson={l.children[0]} />
              })

              return [...cells, ...lessons] as React.ReactNode[]
            }, [])
          }
        </div>
      </div>
    </div>
  )
}

export default FullSchedule
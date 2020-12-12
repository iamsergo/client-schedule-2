import React from 'react'

import { Card, Div } from '@vkontakte/vkui'

import Lesson from '../Lesson'

import { ILesson } from '../../types/ILesson'
import { Day } from '../../types/Day'
import { Week } from '../../types/Week'
import { currentLesson } from '../../utils'

export interface DayCardProps
{
  lessons : ILesson[]
  day ?: Day
  week ?: Week
  infoShow ?: boolean
}

const DayCard : React.FC<DayCardProps> = ({
  lessons,
  day,
  week,
  infoShow = true
}) => {
  return(
    <Div>
      <Card className='day-card'>
        <Div>
          {lessons.map((l,i) => {
            const isExam = day === undefined && week === undefined
            const current = isExam ? false : currentLesson(l.time!, day!, week!)

            return <Lesson infoShow={infoShow} key={i} {...l} current={current} />
          })}
        </Div>
      </Card>
    </Div>
  )
}

export default DayCard
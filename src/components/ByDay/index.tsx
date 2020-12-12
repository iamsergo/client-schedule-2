import React from 'react'
import { Gallery } from '@vkontakte/vkui'

import DayCard from '../DayCard'
import TabsSchedule from '../TabsSchedule'
import { selectDay } from '../../utils'
import { PlainLesson } from '../../types/PlainLesson'
import { useDispatch, useSelector } from 'react-redux'
import { changeDay } from '../../redux/slices/schedule'
import { RootState } from '../../redux/rootReducer'
import { Day } from '../../types/Day'

interface ByDayProps
{
  schedule : PlainLesson[]
}

const DAYS = [0,1,2,3,4,5]

const ByDay : React.FC<ByDayProps> = ({
  schedule
}) => {
  const dispatch = useDispatch()
  const { day, week } = useSelector((s : RootState) => s.schedule)
  
  const dayChange = (d : Day) => dispatch(changeDay(d))

  return(
    <>
      <TabsSchedule week={week} day={day} />
      <Gallery
        style={{height:'100%'}}
        slideIndex={day}
        onChange={dayChange}
      >
        {DAYS.map(d => {
          return <DayCard key={d} day={day} week={week} lessons={selectDay(schedule, d, week)} />
        })}
      </Gallery>
    </>
  )
}

export default ByDay
import React from 'react'
import './TabsSchedule.sass'

import { Tabs, TabsItem } from '@vkontakte/vkui'

import { Day } from '../../types/Day'
import { Week } from '../../types/Week'
import { currentDay, currentWeek } from '../../utils'
import { useDispatch } from 'react-redux'
import { changeDay, changeWeek } from '../../redux/slices/schedule'

export interface TabsScheduleProps
{
  week : Week
  day : Day
}

const DAYS = ['ПН','ВТ','СР','ЧТ','ПТ','СБ']

const TabsSchedule : React.FC<TabsScheduleProps> = ({
  week,
  day,
}) => {
  const dispatch = useDispatch()

  return(
    <>
      <Tabs mode="default" style={{ fontSize : '12px' }}>
        <TabsItem
          style={{ color : currentWeek() === 0 ? 'red' : '' }}
          onClick={() => dispatch(changeWeek(0))} selected={week === 0}
        >Числитель</TabsItem>
        <TabsItem
          style={{ color : currentWeek() === 1 ? 'red' : '' }}
          onClick={() => dispatch(changeWeek(1))} selected={week === 1}
        >Знаменатель</TabsItem>
      </Tabs>
      <Tabs mode="default" style={{ fontSize : '12px' }}>
        {DAYS.map((d, i) => {
          const selected = i === day

          return <TabsItem
            key={i}
            selected={selected}
            style={{ color : currentDay() === i ? 'red' : '' }}
            onClick={() => dispatch(changeDay(i as Day))}
          >{d}</TabsItem>
        })}
      </Tabs>    
    </>
  )
}

export default TabsSchedule
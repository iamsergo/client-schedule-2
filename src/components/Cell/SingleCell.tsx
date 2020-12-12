import React from 'react'
import './Cell.sass'

import { PlainLesson } from '../../types/PlainLesson'
import { currentLesson, currentWeek, getTimeByLesson } from '../../utils'
import { useDispatch } from 'react-redux'
import { requestSchedule, setIsDiff, setSubject } from '../../redux/slices/schedule'
import { useLastSchedules } from '../../utils'
import { FromWhom } from '../../types/ILesson'
import { COUNT_LAST_SCHEDULES } from '../../constans'

interface SingleCellProps
{
  column : number
  row : number
  lesson : PlainLesson
}

const SingleCell : React.FC<SingleCellProps> = ({
  lesson,
  column,
  row
}) => {
  const dispatch = useDispatch()

  const { setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)

  const getStats = (subject : string) => {
    const s = subject.replace(/\(\d гр.\)/,'')
    dispatch(setSubject(s))
  }

  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    dispatch(requestSchedule({href : s.href}))
    dispatch(setIsDiff(false))
  }

  const w = lesson.coords.z
  const cn = [
    lesson.coords.j === 3 ? 'break_bottom' : '',
    currentLesson(getTimeByLesson(lesson.coords.j), lesson.coords.i, w === 2 ? currentWeek() : w) ? 'current' : ''
  ].join(' ')

  return(
    <div
      className="cell cell__single"
      style={{
        gridRow : row,
        gridColumn : column,
      }}
    >
      <div className="cell__single-place">{lesson.place}</div>
      <div
        className={`cell__single-subject ${cn}`}
        onClick={() => getStats(lesson.subject)}
      >{lesson.subject}</div>
      <div className="cell__single-fromWhoms">
        {lesson.fromWhoms.map((fw, i) => {
          return <div
            key={i}
            onClick={() => goToSchedule(fw)}
            className={'linkable'}
          >{fw.title}</div>
        })}
      </div>
    </div>
  )
}

export default SingleCell
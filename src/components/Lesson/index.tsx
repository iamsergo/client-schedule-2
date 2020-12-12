import React from 'react'
import './Lesson.sass'

import Icon28InfoCircleOutline from '@vkontakte/icons/dist/28/info_outline'

import { FromWhom, ILesson } from '../../types/ILesson'
import { requestSchedule, setIsDiff, setSubject } from '../../redux/slices/schedule'
import { useDispatch } from 'react-redux'
import { useLastSchedules } from '../../utils'
import { COUNT_LAST_SCHEDULES } from '../../constans'

interface LessonProps extends ILesson
{
  current : boolean
  infoShow : boolean
}

const Lesson : React.FC<LessonProps> = ({
  time,
  place,
  type,
  subject,
  fromWhoms,
  current,
  infoShow
}) => {
  const dispatch = useDispatch()

  const { setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)
  
  const getStats = (subject : string) => {
    if(type > 2) return
    
    const s = subject.replace(/\(\d гр.\)/,'')
    dispatch(setSubject(s))
  }

  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    dispatch(requestSchedule({href : s.href}))
    dispatch(setIsDiff(false))
  }

  return(
    <div className="lesson-wrapper">
      <div className={`lesson__time ${current ? `lesson__time-current` : ''}`}>
        {time?.map((t, i) => <div key={i}>{t}</div> )}
      </div>
      <div className={`lesson__info lesson__info-${['lec', 'pr', 'lab', 'cons', 'exam'][type]}`}>
        <div className="lesson__place">{place}</div>
        <div
          className="lesson__subject"
          onClick={() => getStats(subject)}
        >
          <div className="lesson__subject-text">{subject}</div>
          {infoShow && <Icon28InfoCircleOutline style={{marginLeft:4}} width="18" height="18"/>}
        </div>
        <div className="lesson__fromWhoms">
          {fromWhoms.map((fw, i) => {
            return(
              <div
                key={i}
                className="linkable"
                onClick={() => goToSchedule(fw)}
              >{fw.title}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Lesson
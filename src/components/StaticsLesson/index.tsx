import React from 'react'
import './StaticsLesson.sass'

import { CellButton, Div, Group, InfoRow, ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton, Progress } from '@vkontakte/vkui'
import { getStatsLesson } from '../../utils'
import Title from '../Title'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { requestSchedule, setIsDiff, setSubject } from '../../redux/slices/schedule'
import { PlainLesson } from '../../types/PlainLesson'
import { FromWhom } from '../../types/ILesson'
import { useLastSchedules } from '../../utils'
import { COUNT_LAST_SCHEDULES } from '../../constans'

interface StaticsLessonProps{}

const TYPE_LESSON = {
  lec : 'Лекции',
  pr : 'Практики',
  lab : 'Лабораторные'
}

const StaticsLesson : React.FC<StaticsLessonProps> = ({
  
}) => {
  const dispatch = useDispatch()
  const { activeSubject, activeSchedule } = useSelector((s : RootState) => s.schedule)

  const { setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)

  const closeModal = () => dispatch(setSubject(null))

  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    closeModal()
    dispatch(requestSchedule({href : s.href}))
    dispatch(setIsDiff(false))
  }
  
  if(!activeSchedule) return null
  
  const data = getStatsLesson(activeSubject as string, activeSchedule.schedule)

  return(
    <ModalRoot
      activeModal={activeSubject ? 'statics_lesson' : null}
      onClose={closeModal}
    >
      <ModalPage
        id="statics_lesson"
        dynamicContentHeight={true}
        onClose={closeModal}
        header={
          <ModalPageHeader
            right={<PanelHeaderButton onClick={closeModal}>Закрыть</PanelHeaderButton>}
          >Статистика</ModalPageHeader>
        }
      >
        <Title title={activeSubject as string}/>
        <Div>
          <Group header="Занятия" separator="hide">
            {data && Object.entries(data.stats).map((entrie, i) => {
              const [key, [now, total]] = entrie

              if(total === 0) return

              return(
                <Div key={i}>
                  <InfoRow header={`${TYPE_LESSON[key as keyof typeof TYPE_LESSON]} ${now}/${total}`}>
                    <Progress className={`progress__${key}`} value={(now / total) * 100} />
                  </InfoRow>
                </Div>
              )
            })}
          </Group>
          {data && data.fromWhoms.length !== 0 &&
            <Group header={activeSchedule.href.includes('t') ? 'Группы' : 'Преподаватели'} separator="hide">
              {data.fromWhoms.map(fw => {
                return <CellButton
                  key={fw.href}
                  onClick={() => goToSchedule(fw)}
                >{fw.title}</CellButton>
              })}
            </Group>
          }
        </Div>
      </ModalPage>
    </ModalRoot>
  )
}

export default StaticsLesson
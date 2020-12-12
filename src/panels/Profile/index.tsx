import React from 'react'
import './Profile.sass'

import { Button, Card, CardScroll, CellButton, Div, Group, InfoRow, Link, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, Placeholder, Progress, ScreenSpinner } from "@vkontakte/vkui"
import Icon28GlobeOutline from '@vkontakte/icons/dist/28/globe_outline'
import { currentWeek, getBackgrounds, toEnd } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { changePanel, changeStory } from '../../redux/slices/navigation'
import { COUNT_LAST_SCHEDULES, MAP_PANEL, PROFILE_STORY, SCHEDULE_PANEL, SCHEDULE_STORY, SEARCH_PANEL } from '../../constans'
import { RootState } from '../../redux/rootReducer'
import { requestSchedule } from '../../redux/slices/schedule'
import { requestEvents, delGroup, requestUser } from '../../redux/slices/profile'
import { FromWhom } from '../../types/ILesson'
import { useLastSchedules } from '../../utils'

interface IProfilePanelProps
{
  id : string
}

const Profile : React.FC<IProfilePanelProps> = ({
  id,
}) => {
  const dispatch = useDispatch()
  
  const {
    events, loadingEvents, errorEvents,
    user, loadingUser, errorUser, userId
  } = useSelector((s : RootState) => s.profile)
  
  const backgrounds = getBackgrounds(events.length)
  const { setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)
  const [now, total, diff] = toEnd()

  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    dispatch(requestSchedule({href : s.href}))
    dispatch(changeStory(SCHEDULE_STORY))
    dispatch(changePanel({story:SCHEDULE_STORY,panel:SCHEDULE_PANEL}))
  }
  
  return(
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton
            onClick={() => dispatch(changePanel({story : PROFILE_STORY, panel : MAP_PANEL}))}
          ><Icon28GlobeOutline /></PanelHeaderButton>
        }
      >Профиль</PanelHeader>
      {errorUser &&
        <Placeholder
          action={<Button mode="tertiary" onClick={() => dispatch(requestUser(userId as number))}>Попробовать еще</Button>}
          stretched
        >Произошла ошибка</Placeholder>
      }
      {!loadingUser && !errorUser &&
        <Div>
          <Group separator={'hide'} header="События" style={{margin : '8px 0px'}}>
            {loadingEvents
              ? <PanelSpinner />
              : errorEvents
                ? <Placeholder
                  action={
                    <Button
                      mode="tertiary"
                      onClick={() => dispatch(requestEvents())}
                    >Попробовать еще</Button>}
                >Произошла ошибка</Placeholder>
                : <CardScroll>
                    {events.map((e,i) => {
                      return <Card
                        key={i}
                        className="event-card"
                        style={{ background : backgrounds[i] }}
                      ><Link href={e.href}>{e.title}</Link></Card>
                    })}
                </CardScroll>
            }
          </Group>
          <Card>
            <Div>
              <b>Текущая неделя : </b>{currentWeek() === 0 ? 'Числитель' : 'Знаменатель'}
            </Div>
            <Div>
              <InfoRow header={`До конца семестра(03.01.2021г) : ${diff} дн.`}>
                <Progress value={(now / total) * 100} />
              </InfoRow>
            </Div>
          </Card>
          <Group header="Ваше расписание" style={{marginTop:8}}>
            <Button
              mode="tertiary"
              className="linkable"
              onClick={() => {
                if(user && user.myGroup)
                  goToSchedule(user.myGroup)
                else
                {
                  dispatch(changeStory(SCHEDULE_STORY))
                  dispatch(changePanel({story:SCHEDULE_STORY,panel:SEARCH_PANEL}))
                }
              }}
            >{(user && user.myGroup) ? user.myGroup.title : 'Выбрать'}</Button>
            {user && user.myGroup &&
              <Div>
                <Button
                  mode="destructive"
                  size="l"
                  style={{width : '100%'}}
                  onClick={() => dispatch(delGroup(user.id))}
                >Удалить расписание</Button>
              </Div>
            }
          </Group>
          {user && user.myGroup &&
            <Group header={user.group.includes('t') ? 'Группы' : 'Преподаватели'} style={{marginTop:8}}>
              {user.fromWhoms.map((fw,i) => {
                return <CellButton
                  key={i}
                  onClick={() => goToSchedule(fw)}
                >{fw.title}</CellButton>
              })}
            </Group>
          }
        </Div>
      }
    </Panel>
  )
}

export default Profile
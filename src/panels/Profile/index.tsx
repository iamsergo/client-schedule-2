import React from 'react'
import './Profile.sass'

import { Avatar, Banner, Button, Card, CardScroll, CellButton, Div, Group, Header, InfoRow, Link, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, Placeholder, Progress, Snackbar, usePlatform } from "@vkontakte/vkui"
import Icon28GlobeOutline from '@vkontakte/icons/dist/28/globe_outline'
import Icon16Favorite from '@vkontakte/icons/dist/16/favorite';
import Icon16OnlineMobile from '@vkontakte/icons/dist/16/online_mobile';
import Icon16Share from '@vkontakte/icons/dist/16/share';
import Icon16ErrorCircleOutline from '@vkontakte/icons/dist/16/error_circle_outline';
import Icon16DoneCircle from '@vkontakte/icons/dist/16/done_circle';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon24NotificationSlashOutline from '@vkontakte/icons/dist/24/notification_slash_outline';
import Icon28SnowflakeOutline from '@vkontakte/icons/dist/28/snowflake_outline';
import bridge from '@vkontakte/vk-bridge'

import bg1 from '../../assets/banner_bg.jpg'
import bg2 from '../../assets/banner_bg1.jpg'

import {currentWeek, toEnd } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { changePanel, changeStory } from '../../redux/slices/navigation'
import { COUNT_LAST_SCHEDULES, MAP_PANEL, PROFILE_STORY, SCHEDULE_PANEL, SCHEDULE_STORY, SEARCH_PANEL } from '../../constans'
import { RootState } from '../../redux/rootReducer'
import { clearHistory, requestSchedule, setIsDiff } from '../../redux/slices/schedule'
import { delGroup, requestStreams } from '../../redux/slices/profile'
import { FromWhom } from '../../types/ILesson'
import { useLastSchedules } from '../../utils'


interface IProfilePanelProps
{
  id : string
}

const Profile : React.FC<IProfilePanelProps> = ({
  id,
}) => {
  const platform = usePlatform()
  
  const dispatch = useDispatch()
  const {
    user, loadingUser, errorUser, userId,
    streams, loadingStreams, errorStreams,
  } = useSelector((s : RootState) => s.profile)

  const [snackbar, setSnackbar] = React.useState<React.ReactElement | null>(null)
  const openSnackbar = (text : string) => {
    setSnackbar(
      <Snackbar
        before={
          <Avatar size={24} style={{backgroundColor:'var(--accent)'}}>
            <Icon16DoneCircle fill="#fff" width={14} height={14} />
          </Avatar>
        }
        onClose={() => setSnackbar(null)}
      >{text}</Snackbar>
    )
  }

  const { setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)
  const [now, total, diff] = toEnd()

  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    dispatch(requestSchedule({href : s.href}))
    dispatch(changeStory(SCHEDULE_STORY))
    dispatch(changePanel({story:SCHEDULE_STORY,panel:SCHEDULE_PANEL}))
  }

  const addToFavorites = () => {
    bridge.send('VKWebAppAddToFavorites')
      .then(_=>openSnackbar('Добавлено в избранное'))
      .catch(err=>err)
  }

  const allowNotifications = () => {
    bridge.send('VKWebAppAllowNotifications')
      .then(_=>openSnackbar('Уведомления разрешены'))
      .catch(err=>err)
  }
  
  const addToHomeScreen = () => {
    bridge.send('VKWebAppAddToHomeScreen')
      .then(res=>res)
      .catch(err=>err)
  }

  const share = () => {
    bridge.send('VKWebAppShare')
      .then(res=>res)
      .catch(err=>err)
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

      {!loadingUser && !errorUser &&
        <Group>
          <Banner
            mode="image"
            header="Ускорение доступа"
            background={
              <div
                style={{
                  backgroundColor: '#5b9be6',
                  backgroundImage: `url(${bg1})`,
                  backgroundPosition: 'right bottom',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            }
            actions={
              <div
                style={{
                  display:'flex',
                  flexDirection : 'column',
                  marginTop : 12,
                  width : '70%',
                }}
              >
                  <Button
                    mode="overlay_primary"
                    onClick={addToFavorites}
                    before={<Icon16Favorite/>}
                  >В избранное</Button>
                  <Button
                    style={{marginTop:8}}
                    mode="overlay_primary"
                    onClick={allowNotifications}
                    before={<Icon24NotificationOutline width={16}/>}
                  >Уведомления</Button>
                {platform === 'android' &&
                  <Button
                    style={{marginTop:8}}
                    mode="overlay_primary"
                    onClick={addToHomeScreen}
                    before={<Icon16OnlineMobile/>}
                  >На дом. экран</Button>
                }
              </div>
            }
          />

          <Banner
            mode="image"
            header="Помощь приложению"
            background={ <div style={{ backgroundColor: '#ed765e' }}/>}
            actions={
              <div style={{ display:'flex', marginTop : 12 }}>
                <Button
                  mode="commerce"
                  onClick={share}
                  before={<Icon16Share/>}
                  style={{flex:1}}
                >Поделиться</Button>
                <Button
                  style={{marginLeft:8, flex:1}}
                  mode="destructive"
                  before={<Icon16ErrorCircleOutline/>}
                ><Link style={{color:'white'}} href={'https://vk.com/board198278031'}>Ошибка!</Link></Button>
              </div>
            }
          />

          <Banner
            mode="image"
            header={`Текущая неделя : ${currentWeek() === 0 ? 'числитель' : 'знаменатель'}`}
            subheader={`Конец семестра 03.01.2021г`}
            background={
              <div
                style={{
                  backgroundColor: '#65c063',
                  backgroundImage: `url(${bg2})`,
                  backgroundPosition: 'right bottom',
                  backgroundSize: 320,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            }
            actions={
              <InfoRow style={{marginTop:4}} header={`Осталось ${diff} дн.`}>
                <Progress
                  style={{width:'70%', marginTop : 8, background : 'gray'}}
                  value={(now / total) * 100}
                />
              </InfoRow>
            }
          />

          <Div style={{padding:'0px 12px'}}>
            <Card className="card-wrapper">
              <Header>Трансляции</Header>
                {loadingStreams
                  ? <PanelSpinner />
                  : errorStreams
                    ? <Div style={{display:'flex', justifyContent:'center'}}>
                        <Button
                          mode="tertiary"
                          onClick={() => dispatch(requestStreams())}
                        >Попробовать еще</Button>
                    </Div>
                    : <CardScroll>
                        {streams.map((stream, i) => {
                          return <Card
                            key={i}
                            className="card-stream"
                          ><Link href={stream.href}>{stream.title}</Link></Card>
                          })
                        }
                      </CardScroll>
                }
              
            </Card>
          </Div>

          <Banner
            mode="image"
            header="Ваше расписание"
            background={<div style={{ backgroundColor:'#fea858' }} />}
            actions={
              user && user.myGroup
                ? <div
                    style={{
                      display:'flex',
                      flexDirection : 'column',
                      marginTop : 12,
                    }}
                  >
                    <Button
                      onClick={() => goToSchedule(user.myGroup!)}
                    >{user.myGroup.title}</Button>
                    <Button
                      mode="destructive"
                      style={{marginTop:8}}
                      onClick={() => {
                        dispatch(setIsDiff(false))
                        dispatch(delGroup(user.id))
                      }}
                    >Удалить расписание</Button>
                  </div>
                : <Button
                    size="xl"
                    onClick={() => {
                      dispatch(changeStory(SCHEDULE_STORY))
                      dispatch(changePanel({story:SCHEDULE_STORY,panel:SEARCH_PANEL}))
                      dispatch(clearHistory())
                    }}
                  >Выбрать</Button>
            }
          />
          {user && user.myGroup &&
            <Div style={{padding:'0px 12px 12px 12px'}}>
              <Card>
                <Group
                  header={<Header>{user.group.includes('t') ? 'Группы' : 'Преподаватели'}</Header>}
                  style={{marginTop:8}}
                >
                  {user.fromWhoms.map((fw,i) => {
                    return <CellButton
                      key={i}
                      onClick={() => goToSchedule(fw)}
                    >{fw.title}</CellButton>
                  })}
                </Group>
              </Card>
            </Div>
          }
        </Group>
      }

      {snackbar}
    </Panel>
  )
}

export default Profile
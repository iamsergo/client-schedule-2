import React from 'react'
import './Schedule.sass'

import { Button, Cell, List, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContext, PanelSpinner, Placeholder } from "@vkontakte/vkui"
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown'
import Icon24Done from '@vkontakte/icons/dist/24/done'

import Title from '../../components/Title'
import DayCard from '../../components/DayCard'
import FullSchedule from '../../components/FullSchedule'
import ByDay from '../../components/ByDay'

import { ILesson } from '../../types/ILesson'
import { PlainLesson } from '../../types/PlainLesson'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { changeMode, popHistory, requestSchedule, setIsDiff } from '../../redux/slices/schedule'
import { changePanel } from '../../redux/slices/navigation'
import { SCHEDULE_STORY, SEARCH_PANEL } from '../../constans'
import { addGroup, delGroup } from '../../redux/slices/profile'
import MenuItemIcon, { MenuItemId } from './MenuItemIcon'
import { getDiff } from '../../utils/'

interface ISchedulePanelProps
{
  id : string
}

export type MenuItem = { text : string, id : string }
const MENU = [
  { text : 'По дням', id : 'byDays' },
  { text : 'Полностью', id : 'full' },
  { text : 'Экзамены', id : 'exams' },
  { text : 'Без разницы', id : 'without_diff' },
  { text : 'Разница', id : 'with_diff' },
  { text : 'Сохранить', id : 'save' },
  { text : 'Удалить', id : 'delete' },
]

const Schedule : React.FC<ISchedulePanelProps> = ({
  id,
}) => {
  const dispatch = useDispatch()
  const { activeMode, activeSchedule, loading, error, history, isDiff } = useSelector((s : RootState) => s.schedule)
  const { user } = useSelector((s : RootState) => s.profile)

  const [menuOpened, setMenuOpened] = React.useState<boolean>(false)
  const toggleMenu = () => setMenuOpened(!menuOpened && !loading)

  const selectMenuItem = (item : MenuItem) => {
    if(item.id !== activeMode.id)
    {
      if(item.id === 'save' && user)
      {
        dispatch(addGroup({uid : user.id, group : history[history.length-1]}))
        dispatch(setIsDiff(false))
      }
      else if(item.id === 'delete' && user)
      {
        dispatch(delGroup(user.id))
        dispatch(setIsDiff(false))
      }
      else if(item.id === 'with_diff' || item.id === 'without_diff')
      {
        dispatch(setIsDiff(item.id === 'with_diff'))
      }
      else if(item.id === 'exams')
      {
        dispatch(changeMode(item))
        dispatch(setIsDiff(false))
      }
      else dispatch(changeMode(item))
    }

    requestAnimationFrame(toggleMenu)
  }

  const goBack = () => {
    dispatch(popHistory())

    if(history.length < 2)
      dispatch(changePanel({story : SCHEDULE_STORY, panel : SEARCH_PANEL}))
  }

  const handleError = () => {
    dispatch(requestSchedule({href : history[history.length - 1], add : false}))
  }

  const diff = React.useMemo(() => {
    if(isDiff && user && user.myGroup && activeSchedule)
      return getDiff(activeSchedule.schedule as PlainLesson[], user.myGroup.schedule)

    return []
  }, [isDiff, user, activeSchedule])

  return(
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
        <div onClick={toggleMenu} className='header'>
          {activeMode.text}
          <Icon16Dropdown fill='var(--accent)' style={{ transform: `rotate(${menuOpened && activeSchedule ? '180deg' : '0'})` }} />
        </div>
      </PanelHeader>
      {activeSchedule &&
        <PanelHeaderContext
          opened={menuOpened}
          onClose={toggleMenu}
        >
          <List>
            {MENU.map((item,i) => {
              const notExams = !activeSchedule?.exams && item.id === 'exams'
              const examsSelected = activeMode.id === 'exams' && (item.id === 'with_diff' || item.id === 'without_diff')

              const myGroup = user && user.group === activeSchedule.href
              const myGroupSave = myGroup && item.id === 'save'
              const notMyGroupDelete = !myGroup && item.id === 'delete'

              const withoutDiff = isDiff && item.id === 'with_diff'
              const withDiff = !isDiff && item.id === 'without_diff'
              const ownDiff = (item.id === 'without_diff' || item.id === 'with_diff') && myGroup

              const notUserGroup = user && !user.group && (item.id === 'with_diff' || item.id === 'without_diff')

              if(
                examsSelected ||
                notExams ||
                myGroupSave ||
                notMyGroupDelete ||
                withoutDiff ||
                withDiff ||
                ownDiff ||
                notUserGroup
              ) return

              let cn = ''
              if(item.id === 'save') cn = 'save'
              else if(item.id === 'delete') cn = 'delete'

              return <Cell
                key={i}
                before={<MenuItemIcon id={item.id as MenuItemId} />}
                onClick={() => selectMenuItem(item)}
                className={cn}
                asideContent={activeMode.id === item.id ? <Icon24Done fill='var(--accent)' /> : null}
              >{item.text}</Cell>
            })}        
          </List>
        </PanelHeaderContext>
      }
      
      {loading && <PanelSpinner />}
      {error && 
        <Placeholder
          action={<Button mode="tertiary" onClick={handleError}>Попробовать еще</Button>}
          stretched
        >Произошла ошибка</Placeholder>
      }
      {activeSchedule && <>
        <Title isDiff={isDiff} mySchedule={(user && user.group === activeSchedule.href) as boolean} title={activeSchedule!.title} />
        {activeMode.id === 'exams' && <DayCard infoShow={false} lessons={activeSchedule!.exams as ILesson[]} />}
        {activeMode.id === 'byDays' &&
          <ByDay schedule={isDiff ? diff : activeSchedule.schedule as PlainLesson[]}/>
        }
        {activeMode.id === 'full' &&
          <FullSchedule schedule={isDiff ? diff : activeSchedule.schedule as PlainLesson[]}/>
        }
      </>}
    </Panel>
  )
}

export default Schedule
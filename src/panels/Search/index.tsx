import React from 'react'
import './Search.sass'
import schedules from '../../data/schedules.json'

import { Card, CardScroll, CellButton, FixedLayout, List, Panel, PanelHeader, PanelSpinner, Placeholder, Search } from "@vkontakte/vkui"

import { FromWhom } from '../../types/ILesson'
import { changePanel } from '../../redux/slices/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { COUNT_LAST_SCHEDULES, SCHEDULE_PANEL, SCHEDULE_STORY } from '../../constans'
import { setQuery, setLoading } from '../../redux/slices/search'
import { RootState } from '../../redux/rootReducer'
import { clearHistory, requestSchedule } from '../../redux/slices/schedule'
import { useLastSchedules } from '../../utils'

interface ISearchPanelProps
{
  id : string
}

const SearchPanel : React.FC<ISearchPanelProps> = ({
  id,
}) => {

  const dispatch = useDispatch()
  const {query, loading} = useSelector((s : RootState) => s.search)
  
  const { last, setLast } = useLastSchedules(COUNT_LAST_SCHEDULES)

  const filterSearch = (value : string) => (s : FromWhom) =>
    s.title.toLowerCase().includes(value.toLowerCase())
    
  const [searchResult, setSearchResult] = React.useState<typeof schedules>(query ? schedules.filter(filterSearch(query)) : [])
  React.useEffect(() => {
    let tid : number | undefined
    if(query)
    {
      tid = setTimeout(() => {
        dispatch(setLoading(false))
        setSearchResult(schedules.filter(filterSearch(query)))
      }, 150) as unknown as number
    }
    else
    {
      dispatch(setLoading(false))
      setSearchResult([])
    }

    return () => clearTimeout(tid)
  }, [query])
  const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.currentTarget.value))
    dispatch(setLoading(true))
  }
  
  const goToSchedule = (s : FromWhom) => {
    setLast(s)
    dispatch(requestSchedule({href : s.href}))
    dispatch(changePanel({ story : SCHEDULE_STORY, panel : SCHEDULE_PANEL }))
  }

  return(
    <Panel separator={false} id={id}>
      <PanelHeader>Поиск</PanelHeader>
      <FixedLayout vertical="top" style={{background:'var(--header_background)'}}>
        <Search
          placeholder="Группа или преподаватель"
          value={query}
          onChange={handleChange}
          after={null}
        />
        {last.length !== 0 &&
          <CardScroll>
            {last.map(s => {
              return <Card
                key={s.href}
                className="last-card"
                onClick={() => goToSchedule(s)}
              >{s.title}</Card>
            })}
          </CardScroll>
        }
      </FixedLayout>
      {
        loading
          ? <div style={{marginTop:100}}><PanelSpinner/></div>
          : searchResult.length === 0
            ? <Placeholder stretched>Ничего не найдено</Placeholder>
            : (
              <List style={{ marginTop : 52 + (last.length === 0 ? 0 : 50) }}>
                {searchResult.map(s => {
                  return <CellButton
                    key={s.href}
                    onClick={() => goToSchedule(s)}
                  >{s.title}</CellButton>
                })}
              </List>
            )
      }

    </Panel>
  )
}

export default SearchPanel
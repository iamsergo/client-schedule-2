import React from 'react'

import bridge from '@vkontakte/vk-bridge'
import { Epic, ScreenSpinner, Tabbar, TabbarItem, View } from '@vkontakte/vkui'

import Schedule from './panels/Schedule'
import Profile from './panels/Profile'
import Map from './panels/Map'
import SearchPanel from './panels/Search'
import StaticsLesson from './components/StaticsLesson'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/rootReducer'
import { changePanel, changeStory } from './redux/slices/navigation'
import { PROFILE_STORY, SCHEDULE_PANEL, SCHEDULE_STORY, SEARCH_PANEL } from './constans'
import { requestEvents, requestUser } from './redux/slices/profile'
import { clearHistory } from './redux/slices/schedule'

const App : React.FC = () => {
	const dispatch = useDispatch()
	const { story, panels } = useSelector((s : RootState) => s.navigation)
	const { loadingUser } = useSelector((s : RootState) => s.profile)

	const changeActiveStory = (e : React.MouseEvent<HTMLDivElement>) => {
		const newStory = e.currentTarget.dataset.story
		if(
			newStory === SCHEDULE_STORY &&
			story === SCHEDULE_STORY &&
			panels.schedule === SCHEDULE_PANEL
		)
		{
			dispatch(changePanel({story:SCHEDULE_STORY, panel:SEARCH_PANEL}))
			dispatch(clearHistory())
		}
		else if(newStory === story) return
		else dispatch(changeStory(newStory))
	}

	React.useEffect(() => {
		async function init()
		{
			// const userData = await bridge.send('VKWebAppGetUserInfo')
			// dispatch(requestEvents())
			// dispatch(requestUser(userData.id))

			const vk_id = 42
			dispatch(requestUser(vk_id))
		}

		init()
	},[])
	
	return(
		<Epic
			activeStory={story}
			tabbar={
				<Tabbar>
					<TabbarItem
						onClick={changeActiveStory}
						selected={story === 'schedule'}
						data-story={'schedule'}
					>schedule</TabbarItem>
					<TabbarItem
						onClick={changeActiveStory}
						selected={story === 'profile'}
						data-story={'profile'}
					>profile</TabbarItem>
				</Tabbar>
			}
		>
			<View
				id={'schedule'}
				activePanel={panels.schedule}
				modal={<StaticsLesson />}
				onSwipeBack={(...args) => console.log('Swipe : ', ...args)}
			>
				<SearchPanel id='search' />
				<Schedule id='schedule' />
			</View>
			<View
				id={'profile'}
				activePanel={panels.profile}
				popout={loadingUser ? <ScreenSpinner /> : null}
			>
				<Profile id='profile' />
				<Map id='map' />
			</View>		
		</Epic>
	)
}

export default App
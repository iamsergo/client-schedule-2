import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { MAP_PANEL, PROFILE_PANEL, PROFILE_STORY, SCHEDULE_PANEL, SCHEDULE_STORY, SEARCH_PANEL, LIST_PANEL, LIST_STORY } from "../../constans"

type Story = typeof PROFILE_STORY | typeof SCHEDULE_STORY | typeof LIST_STORY
type ProfilePanel = typeof PROFILE_PANEL | typeof MAP_PANEL
type SchedulePanel = typeof SCHEDULE_PANEL | typeof SEARCH_PANEL
type ListPanel = typeof LIST_PANEL
type Panel = { schedule : SchedulePanel, profile : ProfilePanel, list : ListPanel }

type ChangePanelAction = { story : keyof Panel, panel : ProfilePanel | SchedulePanel }

interface NavigationState
{
  story : Story
  panels : Panel
}

const initialState : NavigationState = {
  story : PROFILE_STORY,
  panels : {
    schedule : SEARCH_PANEL,
    profile : PROFILE_PANEL,
    list : LIST_PANEL,
  },
}

const navigationSlice = createSlice({
  name : 'navigation',
  initialState,
  reducers : {
    changeStory(state, action)
    {
      state.story = action.payload
    },
    changePanel(state, action : PayloadAction<ChangePanelAction>)
    {
      const { story, panel } = action.payload
      if(story === 'schedule')
        state.panels.schedule = panel as SchedulePanel
      else if(story === 'profile')
        state.panels.profile = panel as ProfilePanel
    },
  }
})

export const { changeStory, changePanel } = navigationSlice.actions
export default navigationSlice.reducer
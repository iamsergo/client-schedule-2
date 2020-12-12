import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import API from "../../API";

import { MenuItem } from '../../panels/Schedule'
import { Day } from "../../types/Day";
import { FromWhom } from "../../types/ILesson";
import { PlainLesson } from "../../types/PlainLesson";
import { Week } from "../../types/Week";
import { currentDay, currentWeek } from "../../utils";
import { RootState } from "../rootReducer";

interface Exam
{
  place: string
  subject: string
  type : 3 | 4
  fromWhoms: FromWhom[]
}

export interface ScheduleData
{
  title : string
  href : string
  schedule : PlainLesson[]
  exams : Exam[]
}

interface ScheduleState
{
  activeMode : MenuItem
  isDiff : boolean
  day : Day
  week : Week
  activeSubject : string | null
  loading : boolean
  error : boolean
  activeSchedule : ScheduleData | null
  schedules : ScheduleData[] // ??? ILesson[]
  history : string[]
}

type RequestScheduleParam = {href : string, add ?: boolean}

export const requestSchedule = createAsyncThunk(
  'schedule/request',
  async ({href} : RequestScheduleParam, thunkAPI) => {    
    const schedules = (thunkAPI.getState() as RootState).schedule.schedules
    const schedule = schedules.find(s => s.href === href.replace('&', ''))
    
    if(schedule) return { uniq : false, schedule}

    const data = await API.requestSchedule(href)
    return { uniq : true, schedule : data}
  }
)

const initialState : ScheduleState = {
  activeMode : { text : 'По дням', id : 'byDays' },
  isDiff : false,
  day : currentDay(),
  week : currentWeek(),
  activeSubject : null,
  loading : false,
  error : false,
  activeSchedule : null,
  schedules : [],
  history : [],
}

const scheduleSlice = createSlice({
  name : 'schedule',
  initialState,
  reducers : {
    changeMode(state, action : PayloadAction<MenuItem>)
    {
      state.activeMode = action.payload
    },
    changeDay(state, action : PayloadAction<Day>)
    {
      state.day = action.payload
    },
    changeWeek(state, action : PayloadAction<Week>)
    {
      state.week = action.payload
    },
    setSubject(state, action)
    {
      state.activeSubject = action.payload
    },
    setIsDiff(state, action)
    {
      state.isDiff = action.payload
    },
    popHistory(state)
    {
      state.isDiff = false
      state.history.pop()
      if(state.history.length !== 0)
      {
        const newActiveHref = state.history[state.history.length - 1]
        const schedule = state.schedules.find(s => s.href === newActiveHref) as ScheduleData
        
        if(!schedule.exams && state.activeMode.id === 'exams')
          state.activeMode = initialState.activeMode

        state.activeSchedule = schedule
      }
    },
    clearHistory(state)
    {
      state.history = []
      state.isDiff = false
    }
  },
  extraReducers(builder)
  {
    builder
      .addCase(requestSchedule.pending,(state, action) => {
        state.loading = true
        state.error = false
        state.activeSchedule = null
        
        const { add = true, href } = action.meta.arg
        if(add)
          state.history.push(href.replace('&', ''))
      })
      .addCase(requestSchedule.rejected,(state) => {
        state.loading = false
        state.error = true
        state.isDiff = false
      })
      .addCase(requestSchedule.fulfilled,(state, action) => {
        state.loading = false
        state.error = false
        const {uniq, schedule} = action.payload
        state.activeSchedule = schedule as ScheduleData
        if(uniq)
          state.schedules.push(schedule)

        if(!schedule.exams && state.activeMode.id === 'exams')
          state.activeMode = initialState.activeMode
      })
  },
})

export const { changeMode, changeDay, changeWeek, setSubject, popHistory, setIsDiff, clearHistory } = scheduleSlice.actions
export default scheduleSlice.reducer
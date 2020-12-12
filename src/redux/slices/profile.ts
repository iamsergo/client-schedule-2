import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FromWhom } from "../../types/ILesson";
import API from '../../API'
import { ScheduleData } from "./schedule";
import { getBackgrounds } from "../../utils";

interface User
{
  id : number
  group : string
  myGroup : ScheduleData | null
  fromWhoms : FromWhom[]  
}

interface ProfileState
{
  events : (FromWhom & {background : string})[]
  loadingEvents : boolean
  errorEvents : boolean

  user : User | null
  userId : number | null
  loadingUser : boolean
  errorUser : boolean
}

export const requestUser = createAsyncThunk(
  'user/request',
  async (id : number) => {
    const user = await API.requestUser(id)
    if(user) return user

    const res = await API.registerUser(id)

    return res
  }
)

export const requestEvents = createAsyncThunk(
  'events/request', API.requestEvents
)

export const addGroup = createAsyncThunk(
  'group/add',
  async ({uid, group} : {uid : number, group : string}) => {
    const data = await API.addGroup({uid, group})

    return data
  }
)

export const delGroup = createAsyncThunk(
  'group/del',
  async (id : number) => {
    const data = await API.delGroup(id)

    return data
  }
)

const initialState : ProfileState = {
  events : [],
  loadingEvents : false,
  errorEvents : false,

  user : null,
  // user : { id : 17, groupId : '', myGroup : null, fromWhoms : [] },
  userId : null,
  loadingUser : true,
  errorUser : false,
}

const profileSlice = createSlice({
  name : 'profile',
  initialState,
  reducers : {},
  extraReducers(builder)
  {
    builder
      .addCase(requestUser.pending, (state, action) => {
        state.loadingUser = true
        state.errorUser = false
        state.userId = action.meta.arg
      })
      .addCase(requestUser.rejected, (state) => {
        state.loadingUser = false
        state.errorUser = true
      })
      .addCase(requestUser.fulfilled, (state, action) => {
        state.loadingUser = false
        state.errorUser = false
        state.user = action.payload
      })

      .addCase(addGroup.pending, (state) => {
        state.loadingUser = true
        state.errorUser = false
      })
      .addCase(addGroup.rejected, (state) => {
        state.loadingUser = false
        state.errorUser = true
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.loadingUser = false
        state.errorUser = false
        state.user!.group = action.payload.group
        state.user!.myGroup = action.payload.myGroup
        state.user!.fromWhoms = action.payload.fromWhoms
      })

      .addCase(delGroup.pending, (state) => {
        state.loadingUser = true
        state.errorUser = false
      })
      .addCase(delGroup.rejected, (state) => {
        state.loadingUser = false
        state.errorUser = true
      })
      .addCase(delGroup.fulfilled, (state) => {
        state.loadingUser = false
        state.errorUser = false
        state.user!.group = ''
        state.user!.myGroup = null
        state.user!.fromWhoms = []
      })

      .addCase(requestEvents.pending, (state) => {
        state.loadingEvents = true
        state.errorEvents = false
      })
      .addCase(requestEvents.rejected, (state) => {
        state.loadingEvents = false
        state.errorEvents = true
      })
      .addCase(requestEvents.fulfilled, (state, action) => {
        state.loadingEvents = false
        state.errorEvents = false

        const events = (action.payload as FromWhom[])
        const bgs = getBackgrounds(events.length)
        state.events = events.map((e,i) => ({ ...e, background : bgs[i] }))
      })
  }
})

export default profileSlice.reducer
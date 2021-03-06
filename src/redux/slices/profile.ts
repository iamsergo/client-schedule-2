import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FromWhom } from "../../types/ILesson";
import API from '../../API'
import { ScheduleData } from "./schedule";

interface User
{
  id : number
  group : string
  myGroup : ScheduleData | null
  fromWhoms : FromWhom[]  
}

interface ProfileState
{
  loadingStreams : boolean
  errorStreams : boolean
  streams : FromWhom[]

  user : User | null
  userId : number | null
  loadingUser : boolean
  errorUser : boolean
}

export const requestStreams = createAsyncThunk(
  'streams/request', API.getStreams
)

export const requestUser = createAsyncThunk(
  'user/request',
  async (id : number) => {
    const user = await API.requestUser(id)
    if(user) return user

    const res = await API.registerUser(id)

    return res
  }
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
  loadingStreams : false,
  errorStreams : false,
  streams : [],

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

      .addCase(requestStreams.pending, (state) => {
        state.loadingStreams = true
        state.errorStreams = false
      })
      .addCase(requestStreams.rejected, (state) => {
        state.loadingStreams = false
        state.errorStreams = true
      })
      .addCase(requestStreams.fulfilled, (state, action) => {
        state.loadingStreams = false
        state.errorStreams = false
        state.streams = action.payload
      })
  }
})

export default profileSlice.reducer
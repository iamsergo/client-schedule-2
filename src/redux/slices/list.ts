import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import API from '../../API'

type ListType = {
  instituts : {[key:string]:number},
  groups : {[key:string]:number}
}

interface ListState
{
  loadingList : boolean
  errorList : boolean
  list : ListType | null
}

export const requestList = createAsyncThunk(
  'list/request', API.getList
)

const initialState : ListState = {
  loadingList : false,
  errorList : false,
  list : null
}

const listSlice = createSlice({
  name : 'list',
  initialState,
  reducers : {},
  extraReducers(builder)
  {
    builder
      .addCase(requestList.pending, (state) => {
        state.loadingList = true
        state.errorList = false
      })
      .addCase(requestList.rejected, (state) => {
        state.loadingList = false
        state.errorList = true
      })
      .addCase(requestList.fulfilled, (state, action) => {
        state.loadingList = false
        state.errorList = false
        state.list = action.payload
      })
  }
})

export default listSlice.reducer
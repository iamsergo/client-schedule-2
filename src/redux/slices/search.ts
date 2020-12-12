import { createSlice } from "@reduxjs/toolkit"

interface SearchState
{
  query : string
  loading : boolean
}

const initialState : SearchState = {
  query : '',
  loading : false
}

const searchSlice = createSlice({
  name : 'search',
  initialState,
  reducers : {
    setQuery(state, action)
    {
      state.query = action.payload
    },
    setLoading(state, action)
    {
      state.loading = action.payload
    }
  }
})

export const { setQuery, setLoading } = searchSlice.actions
export default searchSlice.reducer
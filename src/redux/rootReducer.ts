import { combineReducers } from "@reduxjs/toolkit"

import navigation from './slices/navigation'
import search from './slices/search'
import schedule from './slices/schedule'
import profile from './slices/profile'
import list from './slices/list'

const rootReducer = combineReducers({
  navigation,
  search,
  schedule,
  profile,
  list,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
import { combineReducers } from "@reduxjs/toolkit"

import navigation from './slices/navigation'
import search from './slices/search'
import schedule from './slices/schedule'
import profile from './slices/profile'

const rootReducer = combineReducers({
  navigation,
  search,
  schedule,
  profile,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
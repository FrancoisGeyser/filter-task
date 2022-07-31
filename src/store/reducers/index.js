import { combineReducers } from 'redux'
import { usersReducer } from './userSlice'
import { filtersReducer } from './filterSlice'
import { universityReducer } from './universitySlice'
import { countryReducer } from './countrySlice'

export const rootReducer = combineReducers({
  users: usersReducer,
  filters: filtersReducer,
  universities: universityReducer,
  countries: countryReducer,
})

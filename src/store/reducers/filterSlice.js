import { combineReducers, createSelector, createSlice } from '@reduxjs/toolkit'
import * as utils from './utilities'

const { updaterAdd, updaterRemove } = utils

const initialFilterState = {
  universities: [],
  countries: [],
  states: [],
  cities: [],
}

const addFilterSlice = createSlice({
  name: 'addFilter',
  initialState: initialFilterState,
  reducers: {
    addUniversity: (state, action) => updaterAdd(state, action, 'universities'),
    removeUniversity: (state, action) =>
      updaterRemove(state, action, 'universities'),
    addCountry: (state, action) => updaterAdd(state, action, 'countries'),
    removeCountry: (state, action) => updaterRemove(state, action, 'countries'),
    addState: (state, action) => updaterAdd(state, action, 'states'),
    removeState: (state, action) => updaterRemove(state, action, 'states'),
    addCity: (state, action) => updaterAdd(state, action, 'cities'),
    removeCity: (state, action) => updaterRemove(state, action, 'cities'),
  },
})

const excludeFilterSlice = createSlice({
  name: 'excludeFilter',
  initialState: initialFilterState,
  reducers: {
    addUniversity: (state, action) => updaterAdd(state, action, 'universities'),
    removeUniversity: (state, action) =>
      updaterRemove(state, action, 'universities'),
    addCountry: (state, action) => updaterAdd(state, action, 'countries'),
    removeCountry: (state, action) => updaterRemove(state, action, 'countries'),
    addState: (state, action) => updaterAdd(state, action, 'states'),
    removeState: (state, action) => updaterRemove(state, action, 'states'),
    addCity: (state, action) => updaterAdd(state, action, 'cities'),
    removeCity: (state, action) => updaterRemove(state, action, 'cities'),
  },
})

export const { actions: addFilterActions, reducer: addFilterReducer } =
  addFilterSlice

export const { actions: excludeFilterActions, reducer: excludeFilterReducer } =
  excludeFilterSlice

export const filtersReducer = combineReducers({
  addFilter: addFilterReducer,
  excludeFilter: excludeFilterReducer,
})

export const addFilters = createSelector(
  (state) => state.filters,
  (filters) => filters.addFilter
)

export const excludeFilters = createSelector(
  (state) => state.filters,
  (filters) => filters.excludeFilter
)

export const activeFilter = (key, value, state) => state[key]?.includes(value)
export const activeSelector = (state, key) => {
  if (state[key]) {
    return state[key]?.length > 0
  }
}
export const filterKeys = Object.keys(initialFilterState)

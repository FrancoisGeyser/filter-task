import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const initialState = {
  countries: [],
  states: {},
}

const addCountries = (state, action) => {
  const newState = { ...state, countries: [...action.payload] }
  return newState
}

const addStates = (state, action) => {
  const { state: State, cities } = action.payload
  const newState = {
    ...state,
    states: {
      ...state.states,
      [State]: cities,
    },
  }
  return newState
}

const countrySlice = createSlice({
  name: 'countries',
  initialState: initialState,
  reducers: {
    addCountries,
    addStates,
  },
})

export const { reducer: countryReducer, actions: countryActions } = countrySlice

export const selectCountries = createSelector(
  (state) => state.countries.countries,
  (countries) => {
    const countryData = []
    countries.forEach((e) => {
      countryData.push(e.country)
    })
    return countryData.sort((a, b) => a.localeCompare(b))
  }
)

export const selectStates = createSelector(
  (state) => state.countries.countries,
  (countries) => countries
)

export const selectCities = createSelector(
  (state) => state.countries.states,
  (states) => states
)

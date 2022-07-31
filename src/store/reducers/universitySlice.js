import { createSelector } from 'reselect'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const addAll = (state, action) => {
  const newState = { ...action.payload }
  return newState
}

const universitiesSlice = createSlice({
  name: 'universities',
  initialState: initialState,
  reducers: {
    addAll,
  },
})

export const { reducer: universityReducer, actions: universityActions } =
  universitiesSlice

export const selectUniversityCountries = createSelector(
  (state) => state.universities,
  (universities) => {
    const cities = []
    for (let city in universities) {
      cities.push(city)
    }
    return cities.sort((a, b) => a.localeCompare(b))
  }
)

export const selectUniversities = createSelector(
  (state) => state.universities,
  (universities) => universities
)

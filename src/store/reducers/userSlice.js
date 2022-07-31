import { USERS } from '../usersData'
import { createSelector } from 'reselect'
import { createSlice } from '@reduxjs/toolkit'
import { activeSelector, filterKeys } from './filterSlice'

const initialState = USERS

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
})

export const { reducer: usersReducer } = userSlice

const filtersExluded = (array, exclude, key) =>
  array.reduce((ag, user) => {
    if (!exclude[key].includes(user[key])) {
      ag.push(user)
    }
    return ag
  }, [])

const filtersIncluded = (array, include, key) =>
  array.reduce((ag, user) => {
    if (include[key].includes(user[key])) {
      ag.push(user)
    }
    return ag
  }, [])

const getExcludedResults = (array, keyArray, excludeArray) => {
  if (keyArray.length === 0) return array
  const key = keyArray.pop()

  if (excludeArray[key].length === 0)
    return getExcludedResults(array, keyArray, excludeArray)

  const userList = filtersExluded(array, excludeArray, key)

  return getExcludedResults(userList, keyArray, excludeArray)
}

const getIncludedResults = (array, keyArray, includeArray) => {
  if (keyArray.length === 0) return array
  const key = keyArray.pop()

  if (includeArray[key].length === 0)
    return getIncludedResults(array, keyArray, includeArray)

  const userList = filtersIncluded(array, includeArray, key)

  return getIncludedResults(userList, keyArray, includeArray)
}

export const filteredUsers = createSelector(
  (state) => state.users,
  (state) => state.filters,
  (users, filters) => {
    const { addFilter, excludeFilter } = filters

    const excluded = getExcludedResults(users, [...filterKeys], excludeFilter)
    const included = getIncludedResults(excluded, [...filterKeys], addFilter)

    return included
  }
)

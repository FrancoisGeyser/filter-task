import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import thunkMiddleware from 'redux-thunk'

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    const returnValue = next(action)
    console.log('state after dispatch', getState())
    return returnValue
  }
}

const middleware = [thunkMiddleware, logger]
const enhancers = applyMiddleware(...middleware)

export const store = createStore(rootReducer, enhancers)

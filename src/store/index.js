'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const loggerMiddleware = createLogger()

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(thunkMiddleware, createLogger)
  // )

  // store.subscribe(() =>
  //   console.log(store.getState())
  // )

  return store
}

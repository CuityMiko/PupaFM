'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers').default
      store.replaceReducers(nextReducers)
    })
  }

  return store
}

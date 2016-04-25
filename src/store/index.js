'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const loggerMiddleware = createLogger()

  const enhancer = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )

  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  // store.subscribe(() =>
  //   console.log(store.getState())
  // )

  return store
}

import { loadState, saveState } from 'utility/localStorage'
import rootReducer from 'reducers'

import { applyMiddleware, createStore } from 'redux'
import throttle from 'lodash/throttle'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const CURRENT_VERSION = '0.3.0'

export default function configureStore () {
  const middlewares = [thunk, createLogger()]

  const initialState = loadState()

  let version
  if (initialState && initialState.version) {
    version = initialState.version
    delete initialState['version']
  }

  let store
  if (version && version >= CURRENT_VERSION) {
    store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  } else {
    store = createStore(rootReducer, applyMiddleware(...middlewares))
  }

  store.subscribe(throttle(() => {
    const state = store.getState()

    saveState({
      currentShader: state.currentShader,
      shaders: state.shaders,
      viewports: state.viewports,
      version: CURRENT_VERSION
    })
  }, 1000))

  return store
}

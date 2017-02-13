import { combineReducers } from 'redux'
import { DEFAULT_STORE } from 'javascript/config'
import createReducer from 'reducers/createReducer'
import createShader, * as Shader from 'reducers/createShader'
import menuOpen from 'reducers/menuOpen'
import mapValues from 'lodash/mapValues'

export default combineReducers({
  currentShader: createReducer('shader', 'julia set'),
  menuOpen,
  pinchStart: createReducer('pinch_start', {}),
  shaders: combineReducers(mapValues(DEFAULT_STORE, (shaderConfig, shaderName) => (
    createShader(shaderName, shaderConfig)
  )))
})

export const getCurrentShader = (state) => state.currentShader
export const getShaderConfig = (state, shader, time) => Shader.getShaderConfig(state, shader, time)
export const getShaderViewport = (state, shader) => Shader.getShaderViewport(state, shader)
export const getPinchStart = state => state.pinchStart

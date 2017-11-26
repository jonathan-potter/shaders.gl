import { combineReducers } from 'redux'
import { DEFAULT_STORE } from 'javascript/config'
import createReducer from 'reducers/createReducer'
import createShader, * as Shader from 'reducers/createShader'
import menuOpen from 'reducers/menuOpen'
import ShaderReducers from 'reducers/shaderReducers'
import ViewportReducer, * as Viewport from 'reducers/createViewport'

export default combineReducers({
  currentShader: createReducer('current_shader', null),
  menuOpen,
  pinchStart: createReducer('pinch_start', {}),
  shaderSettings: combineReducers(DEFAULT_STORE.map((shaderConfig, shaderId) => (
    createShader(shaderId, shaderConfig)
  ))),
  viewports: ViewportReducer,
  shaders: ShaderReducers
})

export const getCurrentShader = (state) => state.currentShader
export const getShaderConfig = (state, shader, time) => Shader.getShaderConfig(state, shader, time)
export const getShaderViewport = (state, shader) => Viewport.getShaderViewport(state, shader)
export const getPinchStart = state => state.pinchStart

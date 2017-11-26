import { combineReducers } from 'redux'
import { DEFAULT_STORE } from 'javascript/config'
import createReducer from 'reducers/createReducer'
import createShader, * as Shader from 'reducers/createShader'
import menuOpen from 'reducers/menuOpen'
import ShaderReducers from 'reducers/shaderReducers'
import ViewportReducer, * as Viewport from 'reducers/createViewport'
import RangeSettingsReducer, * as RangeSettings from 'reducers/createRangeSetting'
import { sinusoid } from 'utility/math'
import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'

export default combineReducers({
  currentShaderId: createReducer('current_shader', null),
  menuOpen,
  pinchStart: createReducer('pinch_start', {}),
  shaderSettings: combineReducers(DEFAULT_STORE.map((shaderConfig, shaderId) => (
    createShader(shaderId, shaderConfig)
  ))),
  rangeSettings: RangeSettingsReducer,
  shaders: ShaderReducers,
  viewports: ViewportReducer
})

export const getCurrentShader = ({ shaders, currentShaderId }) => shaders[currentShaderId] || { id: currentShaderId }
export const getShaderViewport = (state, shaderId) => Viewport.getShaderViewport(state, shaderId)
export const getShaderRangeSettings = (state, shaderId) => RangeSettings.getShaderRangeSettings(state, shaderId)
export const getPinchStart = state => state.pinchStart
export const getShaderConfig = (state, shaderId, time) => assign({},
  Shader.getShaderConfig(state, shaderId, time),
  mapValues(getShaderRangeSettings(state, shaderId), settings => sinusoid(assign({ time }, settings)))
)

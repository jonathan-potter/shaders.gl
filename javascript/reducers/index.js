import { combineReducers } from 'redux'
import createReducer from 'reducers/createReducer'
import menuOpen from 'reducers/menuOpen'
import ShaderReducers from 'reducers/shaderReducers'
import ViewportReducer, * as Viewport from 'reducers/createViewport'
import RangeSettingsReducer, * as RangeSettings from 'reducers/createRangeSetting'
import { sinusoid } from 'utility/math'
import mapValues from 'lodash/mapValues'

const { assign } = Object

export default combineReducers({
  currentShaderId: createReducer('current_shader', null),
  renderContext: createReducer('render_context', null),
  menuOpen,
  pinchStart: createReducer('pinch_start', {}),
  rangeSettings: RangeSettingsReducer,
  shaders: ShaderReducers,
  viewports: ViewportReducer
})

export const getCurrentShader = ({ shaders, currentShaderId }) => shaders[currentShaderId]
export const getRenderContext = ({ renderContext }) => renderContext
export const getShaderViewport = (state, shaderId) => Viewport.getShaderViewport(state, shaderId)
export const getDefaultShaderViewport = (state, shaderId) => Viewport.getDefaultShaderViewport(state, shaderId)
export const getShaderRangeSettings = (state, shaderId) => RangeSettings.getShaderRangeSettings(state, shaderId)
export const getPinchStart = state => state.pinchStart
export const getShaderConfig = (state, shaderId, time) => {
  return mapValues(getShaderRangeSettings(state, shaderId), settings => {
    if (typeof settings !== 'object') { return settings }

    return sinusoid(assign({ time }, settings))
  })
}
export const getDefaultShaderConfig = (state, shaderId, time) => {
  return mapValues(RangeSettings.getDefaultRangeSettings(state, shaderId), settings => {
    if (typeof settings !== 'object') { return settings }

    return sinusoid(assign({ time }, settings))
  })
}

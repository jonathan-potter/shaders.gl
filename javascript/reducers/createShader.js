import { combineReducers } from 'redux'
import createRangeSetting from 'reducers/createRangeSetting'
import createSelectSetting from 'reducers/createSelectSetting'
import createViewport from 'reducers/createViewport'

import mapValues from 'lodash/mapValues'

const { PI: pi, sin } = Math

export default function (SHADER, DEFAULT_PROPERTIES) {
  return combineReducers({
    rangeSettings: combineReducers(mapValues(DEFAULT_PROPERTIES.rangeSettings, (value, name) => {
      return createRangeSetting(SHADER, name, value)
    })),

    selectSettings: combineReducers(mapValues(DEFAULT_PROPERTIES.selectSettings, (value, name) => {
      return createSelectSetting(SHADER, name, value)
    })),

    viewport: createViewport(SHADER, DEFAULT_PROPERTIES.viewport)
  })
}

export const getShaderViewport = (state, shader) => state.shaders[shader].viewport
export const getShaderConfig = (state, shader, time) => {
  return Object.assign(
    {},
    mapValues(state.shaders[shader].rangeSettings, momentaryValue(time)),
    state.shaders[shader].selectSettings
  )
}

const momentaryValue = (time) => ({ amplitude, animated, frequency, phase, value }) => {
  if (!animated) { return value }
console.log(value + amplitude * sin(2 * pi * frequency + phase))
  return value + amplitude * sin(2 * pi * frequency * time + phase)
}

import { combineReducers } from 'redux'
import createSelectSetting from 'reducers/createSelectSetting'
import { sinusoid } from 'utility/math'

import mapValues from 'lodash/mapValues'
const { assign } = Object

export default function (SHADER, DEFAULT_PROPERTIES) {
  return combineReducers({
    selectSettings: combineReducers(mapValues(DEFAULT_PROPERTIES.selectSettings, (value, name) => {
      return createSelectSetting(SHADER, name, value)
    }))
  })
}

export const getShaderMenuConfig = (state, shader) => state.shaders[shader].config.menu
export const getShaderConfig = (state, shader, time) => {
  if (!state.shaders[shader]) { return {} }

  const { config } = state.shaders[shader]

  return assign(
    {},
    mapValues(config.settings.rangeSettings, settings => sinusoid(assign({ time }, settings))),
    config.settings.selectSettings
  )
}

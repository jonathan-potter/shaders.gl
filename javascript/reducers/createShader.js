import { combineReducers } from 'redux'
import createRangeSetting from 'reducers/createRangeSetting'
import createSelectSetting from 'reducers/createSelectSetting'
import { sinusoid } from 'utility/math'

import assign from 'lodash/assign'
import mapValues from 'lodash/mapValues'

export default function (SHADER, DEFAULT_PROPERTIES) {
  return combineReducers({
    rangeSettings: combineReducers(mapValues(DEFAULT_PROPERTIES.rangeSettings, (value, name) => {
      return createRangeSetting(SHADER, name, value)
    })),

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

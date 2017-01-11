import { combineReducers } from 'redux'
import createSetting from 'reducers/createSetting'
import createViewport from 'reducers/createViewport'

import mapValues from 'lodash/mapValues'

export default function (SHADER, DEFAULT_PROPERTIES) {
  const stuff = {
    config: combineReducers(mapValues(DEFAULT_PROPERTIES.config, (value, name) => {
      return createSetting(SHADER, name, value)
    })),

    viewport: createViewport(SHADER, DEFAULT_PROPERTIES.viewport)
  }

  return combineReducers(stuff)
}

export const getShaderConfig = (state, shader) => state.shaders[shader].config
export const getShaderViewport = (state, shader) => state.shaders[shader].viewport

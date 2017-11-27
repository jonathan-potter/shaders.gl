import { getTime } from 'utility/time'
import merge from 'lodash/merge'
import { phaseForSmoothFrequencyChange } from 'utility/math'

export default function rangeSettings (state = { defaults: {} }, action) {
  switch (action.type) {
    case 'ADD_SHADER': {
      const { shader } = action

      return {
        ...state,
        defaults: {
          ...state.defaults,
          [shader.id]: shader.config.settings.rangeSettings
        }
      }
    }
    case 'RESET_SHADER_CONFIG': {
      const { shaderId } = action
      const { ...rest } = state

      delete rest[shaderId]

      return rest
    }
    default: {
      const { name, shaderId } = action

      if (!shaderId || !name) { return state }

      const rangeSettings = getShaderRangeSettings({ rangeSettings: state }, shaderId)
      const rangeSetting = rangeSettings[name] || {}
      const updatedRangeSetting = updateRangeSettings({ action, state: rangeSetting })

      if (rangeSettings === updatedRangeSetting) { return state }

      return {
        ...state,
        [shaderId]: {
          ...rangeSettings,
          [name]: {
            ...rangeSetting,
            ...updatedRangeSetting
          }
        }
      }
    }
  }
}

function updateRangeSettings ({ action, state = {} }) {
  switch (action.type) {
    case 'SET_CONFIG_VALUE':
      return {
        ...state,
        value: action.value
      }
    case 'SET_CONFIG_ANIMATE':
      return {
        ...state,
        animated: action.value
      }
    case 'SET_CONFIG_AMPLITUDE':
      return {
        ...state,
        amplitude: action.value
      }
    case 'SET_CONFIG_PHASE':
      return {
        ...state,
        phase: action.value
      }
    case 'SET_CONFIG_FREQUENCY':
      const { frequency: f1, phase: phi1 } = state
      const f2 = action.value
      const t = getTime()

      return {
        ...state,
        frequency: action.value,
        phase: phaseForSmoothFrequencyChange({ f1, f2, phi1, t })
      }
    default:
      return state
  }
}

export const getShaderRangeSettings = (state, shaderId) => (
  merge({},
    state.rangeSettings.defaults[shaderId],
    state.rangeSettings[shaderId]
  )
)

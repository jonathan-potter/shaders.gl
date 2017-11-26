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
    default: {
      const { name, shaderId } = action

      const rangeSettings = state[shaderId]
      const updatedRangeSettings = updateRangeSettings({ action, rangeSettings })

      if (rangeSettings === updatedRangeSettings) { return state }

      return {
        ...state,
        [shaderId]: {
          ...rangeSettings,
          [name]: updatedRangeSettings
        }
      }
    }
  }
}

function updateRangeSettings ({ action, rangeSettings: state = {} }) {
  const { shaderId } = action

  switch (action.type) {
    case 'RESET_SHADER_CONFIG':
      return state.rangeSettings.defaults[shaderId]
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
  merge(
    {},
    state.rangeSettings.defaults[shaderId],
    state.rangeSettings[shaderId]
  )
)

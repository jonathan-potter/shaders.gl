import { getTime } from 'utility/time'
import { phaseForSmoothFrequencyChange } from 'utility/sinusoids'

const { PI: pi } = Math

export default function (SHADER, NAME, DEFAULT_VALUE) {
  return function (state = DEFAULT_VALUE, action) {
    if (action.shader !== SHADER) { return state }

    switch (action.type) {
      case 'RESET_SHADER_CONFIG':
        return DEFAULT_VALUE
    }

    if (action.name !== NAME) { return state }

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
}

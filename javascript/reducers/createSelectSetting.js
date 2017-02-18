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
        return action.value
      default:
        return state
    }
  }
}

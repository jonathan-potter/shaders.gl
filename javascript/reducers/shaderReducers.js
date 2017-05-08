export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_SHADER':
      return state.concat(action.shader)
    case 'UPDATE_SHADER': {
      const index = state.findIndex(shader => shader.id === action.shader.id)

      return [
        ...state.slice(0, index),
        action.shader,
        ...state.slice(index + 1)
      ]
    }
    case 'DESTROY_SHADER': {
      const index = state.findIndex(shader => shader.id === action.shader.id)

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    }
    default:
      return state
  }
}

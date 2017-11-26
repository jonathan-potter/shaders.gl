export default (state = {}, action) => {
  const { shader } = action

  switch (action.type) {
    case 'ADD_SHADER': {
      return {
        ...state,
        [shader.id]: shader
      }
    }
    case 'UPDATE_SHADER':
      return {
        ...state,
        [shader.id]: shader
      }
    case 'DESTROY_SHADER':
      const object = {
        ...state
      }

      delete object[shader.id]

      return object
    default:
      return state
  }
}

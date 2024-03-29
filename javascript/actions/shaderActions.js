export default {
  add: shader => dispatch => {
    dispatch({
      type: 'ADD_SHADER',
      shader: {
        ...shader,
        config: JSON.parse(shader.config)
      }
    })
  },

  update: shader => dispatch => {
    dispatch({
      type: 'UPDATE_SHADER',
      shader
    })
  },

  destroy: shader => dispatch => {
    dispatch({
      type: 'DESTROY_SHADER',
      shader
    })
  }
}

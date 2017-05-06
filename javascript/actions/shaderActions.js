export default {
  create: shader => dispatch => {
    dispatch({
      type: 'CREATE_SHADER',
      shader
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

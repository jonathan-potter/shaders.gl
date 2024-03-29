import ShaderActions from 'actions/ShaderActions'
import { getCurrentShader, getShaderViewport, getPinchStart } from 'reducers'
import registerEvent from 'utility/registerEvent'
import throttle from 'lodash/throttle'

const throttledRegisterEvent = throttle(registerEvent, 1000)

export const resetShader = () => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'RESET_SHADER_CONFIG'

  registerEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action,
    shaderId: currentShader.id
  })
}

export const zoomToLocation = ({ delta, location, shader, pinchZoom }) => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'ZOOM_TO_LOCATION'

  registerEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action,
    shaderId: currentShader.id,
    location,
    delta,
    pinchZoom
  })
}

export const zoomIn = ({ location }) => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'ZOOM_IN'

  registerEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action,
    shaderId: currentShader.id,
    location
  })
}

export const zoomOut = ({ location }) => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'ZOOM_OUT'

  registerEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action,
    shaderId: currentShader.id,
    location
  })
}

export const setSelectValue = ({ name, value }) => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'SET_SELECT_VALUE'

  throttledRegisterEvent({
    category: currentShader.id,
    action: action,
    label: name,
    value
  })

  dispatch({
    type: action,
    shaderId: currentShader.id,
    name,
    value
  })
}

export const setValue = ({ action, name, value }) => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())

  throttledRegisterEvent({
    category: currentShader.id,
    action,
    label: name,
    value
  })

  dispatch({
    type: action,
    shaderId: currentShader.id,
    name,
    value
  })
}

export const setCurrentShader = ({ shader }) => (dispatch, getState) => {
  const action = 'SET_CURRENT_SHADER'

  throttledRegisterEvent({
    category: shader,
    action: action,
    label: shader
  })

  dispatch({
    type: action,
    value: shader
  })
}

export const toggleMenu = () => (dispatch, getState) => {
  const currentShader = getCurrentShader(getState())
  const action = 'TOGGLE_MENU'

  throttledRegisterEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action
  })
}

export const setPinchStart = ({ center }) => (dispatch, getState) => {
  const state = getState()

  const currentShader = getCurrentShader(state)
  const viewport = getShaderViewport(state, currentShader)
  const action = 'SET_PINCH_START'

  registerEvent({
    category: currentShader.id,
    action: action
  })

  dispatch({
    type: action,
    value: {
      center,
      viewport: { ...viewport }
    }
  })
}

export const pinchZoom = ({ center, rotation, scale }) => (dispatch, getState) => {
  const state = getState()

  const currentShader = getCurrentShader(state)
  const pinchStart = getPinchStart(state)
  const action = 'PINCH_ZOOM'

  if (Object.keys(pinchStart).length > 0) {
    /* pinch start must have registered before firing this action */

    dispatch({
      type: action,
      shaderId: currentShader.id,
      pinchStart,
      pinchCurrent: {
        center,
        rotation,
        scale
      }
    })
  }
}

export const resetPinchStart = () => (dispatch) => {
  dispatch({
    type: 'RESET_PINCH_START'
  })
}

export const resetRenderId = () => (dispatch) => {
  dispatch({
    type: 'RESET_RENDER_ID'
  })
}

export { ShaderActions }

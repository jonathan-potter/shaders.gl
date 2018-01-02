import configureProgram from 'webgl-utilities/configureProgram'
import createFrameRenderer from 'webgl/createFrameRenderer'
import vertexShaderSource from 'shaders/vertexShader.glsl'
import uuid from 'node-uuid'

const { requestAnimationFrame } = window

export default ({ canvas, shaderId, singleFrame, smallFrame, store }) => {
  const context = canvas.getContext('webgl')

  const renderId = uuid.v4()

  const startRunLoop = createRunLoop({
    canvas,
    context,
    renderId,
    shaderId: shaderId,
    singleFrame,
    smallFrame,
    store
  })

  store.subscribe(startRunLoop)
  store.dispatch({
    type: 'SET_RENDER_ID',
    value: renderId
  })

  startRunLoop()
}

const createRunLoop = ({ canvas, context, renderId, shaderId, singleFrame, smallFrame, store, firstRun = true }) => () => {
  const state = store.getState()
  const fragmentShaderSource = state.shaders[shaderId] && state.shaders[shaderId].code

  if (fragmentShaderSource && firstRun) {
    firstRun = false

    const program = configureProgram({ context, fragmentShaderSource, vertexShaderSource })

    context.useProgram(program)
    const frameRenderer = createFrameRenderer({ canvas, context, renderId, shaderId, singleFrame, smallFrame, program, store })
    requestAnimationFrame(frameRenderer)
  }
}

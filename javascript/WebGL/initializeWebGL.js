import configureProgram from 'webgl-utilities/configureProgram'
import createFrameRenderer from 'webgl/createFrameRenderer'
import vertexShaderSource from 'shaders/vertexShader.glsl'

const { requestAnimationFrame } = window

export default ({ canvas, shaderId, store }) => {
  const startRunLoop = createRunLoop({
    canvas,
    context: canvas.getContext('webgl'),
    shaderId: shaderId,
    store
  })

  store.subscribe(startRunLoop)

  startRunLoop()
}

const createRunLoop = ({ canvas, context, shaderId, store, firstRun = true }) => () => {
  const state = store.getState()
  const fragmentShaderSource = state.shaders[shaderId] && state.shaders[shaderId].code

  if (fragmentShaderSource && firstRun) {
    firstRun = false

    const program = configureProgram({ context, fragmentShaderSource, vertexShaderSource })

    context.useProgram(program)
    const frameRenderer = createFrameRenderer({ canvas, context, shaderId, program, store })
    requestAnimationFrame(frameRenderer)
  }
}

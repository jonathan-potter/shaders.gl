import { getCurrentShader } from 'reducers'
import createFrameRenderer from 'webgl/createFrameRenderer'
import programForShader from 'webgl-utilities/programForShader'

const { requestAnimationFrame } = window

export default ({ canvas, store }) => {
  const state = store.getState()

  const startRunLoop = createRunLoop({
    canvas,
    context: canvas.getContext('webgl'),
    shader: getCurrentShader(state),
    store
  })

  store.subscribe(startRunLoop)
}

const createRunLoop = ({ canvas, context, shader, store, firstRun = true }) => () => {
  const state = store.getState()
  const currentShader = getCurrentShader(state)
  const fragmentShaderSource = state.shaders[currentShader] && state.shaders[currentShader].code

  if (fragmentShaderSource && (shader !== currentShader || firstRun)) {
    shader = currentShader
    firstRun = false

    const program = programForShader({ context, fragmentShaderSource, shader })

    context.useProgram(program)
    requestAnimationFrame(createFrameRenderer({ canvas, context, shader, program, store }))
  }
}

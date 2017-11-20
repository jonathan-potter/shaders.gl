import createFrameRenderer from 'webgl/createFrameRenderer'
import programForShader from 'webgl-utilities/programForShader'

const { requestAnimationFrame } = window

export default ({ canvas, shaderId, store }) => {
  const startRunLoop = createRunLoop({
    canvas,
    context: canvas.getContext('webgl'),
    shader: shaderId,
    store
  })

  store.subscribe(startRunLoop)

  startRunLoop()
}

const createRunLoop = ({ canvas, context, shader, store, firstRun = true }) => () => {
  const state = store.getState()
  const fragmentShaderSource = state.shaders[shader] && state.shaders[shader].code

  if (fragmentShaderSource && firstRun) {
    firstRun = false

    const program = programForShader({ context, fragmentShaderSource, shader })

    context.useProgram(program)
    requestAnimationFrame(createFrameRenderer({ canvas, context, shader, program, store }))
  }
}

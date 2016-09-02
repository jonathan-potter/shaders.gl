import { getCurrentFractal, getFractalConfig, getFractalViewport } from 'reducers'
import setUniformValue from 'webgl-utilities/setUniformValue'

/* libraries */
import assign from 'lodash/assign'
import forEach from 'lodash/forEach'

const { requestAnimationFrame } = window

const FRACTAL_ENUM = {
  'julia set': 0,
  'mandelbrot set': 1
}

let time = Date.now()
export default function drawFrame ({ canvas, context, program, store }) {
  /* eslint-disable no-multi-spaces, key-spacing */
  const state = store.getState()

  const currentFractal    = getCurrentFractal(state)
  const { center, range } = getFractalViewport(state, currentFractal)
  const config            = getFractalConfig(state, currentFractal)

  time += parseFloat(config.speed)

  const uniformValues = assign({}, config, {
    fractal: FRACTAL_ENUM[currentFractal],
    center:  [center.x, center.y],
    range:   [range.x, range.y],
    width:   window.innerWidth,
    height:  window.innerHeight,
    c_real:  -0.795 + Math.sin(time / 2000) / 40,
    c_imag:  0.2321 + Math.cos(time / 1330) / 40
  })

  forEach(uniformValues, (uniformValue, uniformName) => {
    setUniformValue(uniformName, uniformValue, context, program)
  })

  context.drawArrays(context.TRIANGLE_STRIP, 0, 4)

  resize({ canvas, context })

  requestAnimationFrame(drawFrame.bind(null, { canvas, context, program, store }))
  /* eslint-enable no-multi-spaces, key-spacing */
}

function resize ({ canvas, context }) {
  /* http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html */
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight

  if (canvas.width !== WIDTH || canvas.height !== HEIGHT) {
    canvas.width = WIDTH
    canvas.height = HEIGHT

    context.viewport(0, 0, WIDTH, HEIGHT)
  }
}

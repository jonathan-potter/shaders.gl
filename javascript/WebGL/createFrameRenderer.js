import { getCurrentShader, getShaderConfig, getShaderViewport } from 'reducers'
import { SHADER_ENUM } from 'javascript/config'
import setUniformValue from 'webgl-utilities/setUniformValue'
import msaaCoordinates from 'webgl-utilities/msaaCoordinates'

import assign from 'lodash/assign'
import forEach from 'lodash/forEach'

const { requestAnimationFrame } = window

let time = 0
export default ({ canvas, context, shader, program, store }) => function renderFrame () {
  /* eslint-disable no-multi-spaces, key-spacing */
  const state = store.getState()

  const currentShader = getCurrentShader(state)
  if (shader === currentShader) {
    const { center, range, rotation } = getShaderViewport(state, currentShader)
    const config = getShaderConfig(state, currentShader, time / 1000)

    if (config.speed) {
      time += parseFloat(config.speed)
    } else {
      /* only here for spinning cube */
      time += 0.016
    }

    const ASPECT_RATIO = window.innerWidth / window.innerHeight

    const uniformValues = assign({}, config, {
      shader: SHADER_ENUM[currentShader],
      center: [center.x, center.y],
      /* range.x is intentionally ignored in favor of setting */
      /* the window dimensions to dictate aspect ratio */
      range:  [range.y * ASPECT_RATIO, range.y],
      rotation: rotation || 0,
      resolution: [
        window.innerWidth,
        window.innerHeight
      ],
      julia_c: [
        -0.795 + Math.sin(time / 2000) / 40,
        0.2321 + Math.cos(time / 1330) / 40
      ],
      msaa_coordinates: msaaCoordinates[config.supersamples],
      /* large times won't convert to float 32 well :( */
      time: time
    })

    context.useProgram(program)
    forEach(uniformValues, (uniformValue, uniformName) => {
      setUniformValue(uniformName, uniformValue, context, program)
    })

    context.drawArrays(context.TRIANGLE_STRIP, 0, 4)

    resize({ canvas, context })

    requestAnimationFrame(renderFrame)
  }
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

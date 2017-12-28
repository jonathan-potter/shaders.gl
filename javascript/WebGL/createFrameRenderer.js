import { getCurrentShader, getShaderConfig, getShaderViewport } from 'reducers'
import setUniformValue from 'webgl-utilities/setUniformValue'
import msaaCoordinates from 'webgl-utilities/msaaCoordinates'
import { advanceTime, getTime } from 'utility/time'

import assign from 'lodash/assign'
import forEach from 'lodash/forEach'

const { requestAnimationFrame } = window

export default ({ canvas, context, shaderId, singleFrame, program, store }) => function renderFrame (depth = 0) {
  /* eslint-disable no-multi-spaces, key-spacing */
  const state = store.getState()

  const currentShader = getCurrentShader(state)
  const { center, range, rotation } = getShaderViewport(state, shaderId)

  if (!singleFrame && parseInt(shaderId) !== currentShader.id) { return }

  const time = getTime(shaderId)
  const config = getShaderConfig(state, shaderId, time)

  if (config.speed) {
    advanceTime(shaderId, parseFloat(config.speed) / 1000)
  } else {
    /* only here for spinning cube */
    advanceTime(shaderId, 0.016)
  }

  const width = singleFrame ? canvas.offsetWidth : window.innerWidth
  const height = singleFrame ? canvas.offsetHeight : window.innerHeight

  const aspectRatio = width / height

  const uniformValues = assign({}, config, {
    shader: shaderId,
    center: [center.x, center.y],
    /* range.x is intentionally ignored in favor of setting */
    /* the window dimensions to dictate aspect ratio */
    range:  [range.y * aspectRatio, range.y],
    rotation: rotation || 0,
    resolution: [ width, height ],
    julia_c: [
      -0.795 + Math.sin(time / 2) / 40,
      0.2321 + Math.cos(time / 1.33) / 40
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

  resize({ canvas, context, height, singleFrame, width })

  // if (depth === 0 || !singleFrame) {
  requestAnimationFrame(renderFrame)
  depth++
  // }
  /* eslint-enable no-multi-spaces, key-spacing */
}

function resize ({ canvas, context, height, singleFrame, width }) {
  /* http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html */
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height

    context.viewport(0, 0, width, height)
  }
}

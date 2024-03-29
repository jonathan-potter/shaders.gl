import { getRenderId, getDefaultShaderConfig, getDefaultShaderViewport, getShaderConfig, getShaderViewport } from 'reducers'
import setUniformValue from 'webgl-utilities/setUniformValue'
import msaaCoordinates from 'webgl-utilities/msaaCoordinates'
import { advanceTime, getTime } from 'utility/time'

import forEach from 'lodash/forEach'

const { assign } = Object
const { requestAnimationFrame } = window

export default ({ canvas, context, renderId, shaderId, singleFrame, smallFrame, program, store, depth = 0 }) => function renderFrame () {
  /* eslint-disable no-multi-spaces, key-spacing */
  const state = store.getState()

  const currentRenderId = getRenderId(state)

  /* reasons for stopping animation */
  const afterSingleFrame = singleFrame && depth++ > 1 // for a single frame to appear two frames are required
  const idMismatch = !singleFrame && currentRenderId !== renderId

  if (afterSingleFrame || idMismatch) { return }

  const time = getTime(shaderId)
  /* return default config values for single frame rendering */
  const { center, range, rotation } = smallFrame ? getDefaultShaderViewport(state, shaderId) : getShaderViewport(state, shaderId)
  const config = smallFrame ? getDefaultShaderConfig(state, shaderId, time) : getShaderConfig(state, shaderId, time)
  const width = smallFrame ? canvas.offsetWidth * 2 : window.innerWidth
  const height = smallFrame ? canvas.offsetHeight * 2 : window.innerHeight

  if (config.speed) {
    advanceTime(shaderId, parseFloat(config.speed) / 1000)
  } else {
    /* only here for spinning cube */
    advanceTime(shaderId, 0.016)
  }

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

  resize({ canvas, context, height, width })

  requestAnimationFrame(renderFrame)
  /* eslint-enable no-multi-spaces, key-spacing */
}

function resize ({ canvas, context, height, width }) {
  /* http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html */
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height

    context.viewport(0, 0, width, height)
  }
}

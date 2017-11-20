import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'

const { abs, PI: pi } = Math

class CanvasContainer extends Component {
  componentDidMount () {
    this.props.initializeWebGL()

    /* React onClick's SyntheticEvent does not contain all required properties */
    const canvas = document.getElementById('main')

    canvas.addEventListener('click', this.onClick.bind(this))
    canvas.addEventListener('wheel', this.onWheel.bind(this))
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this))
  }

  onTouchMove (event) {
    event.preventDefault()

    const touches = Array.from(event.touches)

    this.props.pinchZoom({
      scale: event.scale || 1,
      rotation: (event.rotation || 0) * pi / 180,
      center: {
        x: touches.reduce((sum, touch) => (sum + touch.clientX), 0) / touches.length / window.innerWidth,
        y: touches.reduce((sum, touch) => (sum + touch.clientY), 0) / touches.length / window.innerHeight
      }
    })
  }

  onTouchStart (event) {
    event.preventDefault()

    const touches = Array.from(event.touches)

    this.props.setPinchStart({
      center: {
        x: touches.reduce((sum, touch) => (sum + touch.clientX), 0) / touches.length / window.innerWidth,
        y: touches.reduce((sum, touch) => (sum + touch.clientY), 0) / touches.length / window.innerHeight
      }
    })
  }

  onTouchEnd (event) {
    event.preventDefault()

    this.props.resetPinchStart()
  }

  onClick (event) {
    const canvas = document.getElementById('main')

    this.props.zoomIn({
      location: {
        x: event.offsetX / canvas.width,
        y: event.offsetY / canvas.height
      }
    })
  }

  onWheel (event) {
    const { ctrlKey: pinchZoom, deltaY, offsetX, offsetY } = event
    const canvas = document.getElementById('main')

    event.preventDefault()

    if (abs(deltaY) < 0.01) { return }

    this.props.zoomToLocation({
      location: {
        x: offsetX / canvas.width,
        y: offsetY / canvas.height
      },
      delta: deltaY,
      pinchZoom
    })
  }

  render () {
    return <canvas id='main' />
  }
}

export default connect(
  () => ({}),
  actions
)(CanvasContainer)

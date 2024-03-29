const CLICK_ZOOM_SIZE = 0.5
const SCROLL_ZOOM_SIZE = 0.95
const PINCH_ZOOM_SIZE = 0.97

const { atan2, cos, sign, sin, sqrt } = Math

const VIEWPORT_PROTOTYPE = {
  init ({ center, range, rotation }) {
    this.center = center
    this.range = range
    this.rotation = rotation
  },

  aspectRatio () {
    return window.innerWidth / window.innerHeight
  },

  serialize () {
    return {
      center: this.center,
      range: this.range,
      rotation: this.rotation
    }
  },

  setCenter (location) {
    return Viewport.create({
      center: location,
      range: this.range,
      rotation: this.rotation
    })
  },

  cartesianLocation (normalizedLocation) {
    if (!normalizedLocation) { return }

    let { x, y } = normalizedLocation

    x -= 0.5
    y -= 0.5
    x *= this.aspectRatio()
    y *= -1

    const magnitude = Math.sqrt(x * x + y * y)
    const angle = Math.atan2(y, x)

    x = magnitude * Math.cos(angle + this.rotation)
    y = magnitude * Math.sin(angle + this.rotation)

    return {
      x: this.center.x + this.range.y * x,
      y: this.center.y + this.range.y * y
    }
  },

  zoomToLocation ({ delta = 0, center = this.center, pinchZoom }) {
    const newRange = { ...this.range }
    const newCenter = { ...center }
    const zoomSize = pinchZoom ? PINCH_ZOOM_SIZE : SCROLL_ZOOM_SIZE

    /* translate */
    let dx = (this.center.x - center.x)
    let dy = (this.center.y - center.y)

    /* rotate */
    const magnitude = sqrt(dx * dx + dy * dy)
    const angle = atan2(dy, dx)

    dx = magnitude * cos(angle - this.rotation)
    dy = magnitude * sin(angle - this.rotation)

    if (sign(delta) < 0) {
      newCenter.x += dx * zoomSize
      newCenter.y += dy * zoomSize
      newRange.x *= zoomSize
      newRange.y *= zoomSize
    } else if (sign(delta) > 0) {
      newCenter.x += dx / zoomSize
      newCenter.y += dy / zoomSize
      newRange.x /= zoomSize
      newRange.y /= zoomSize
    }

    return Viewport.create({
      center: newCenter,
      range: newRange,
      rotation: this.rotation
    })
  },

  zoomIn (location = this.center) {
    const newRange = {
      x: this.range.x * CLICK_ZOOM_SIZE,
      y: this.range.y * CLICK_ZOOM_SIZE
    }

    return Viewport.create({
      center: location,
      range: newRange,
      rotation: this.rotation
    })
  },

  zoomOut (location = this.center) {
    const newRange = {
      x: this.range.x / CLICK_ZOOM_SIZE,
      y: this.range.y / CLICK_ZOOM_SIZE
    }

    return Viewport.create({
      center: location,
      range: newRange,
      rotation: this.rotation
    })
  }
}

const Viewport = {
  create ({ center, range, rotation }) {
    const viewport = Object.create(VIEWPORT_PROTOTYPE)

    viewport.init({ center, range, rotation })

    return viewport
  }
}

export default Viewport

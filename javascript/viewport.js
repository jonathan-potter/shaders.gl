const ZOOM_SIZE = 0.95

const { sign } = Math

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

  zoomToLocation (location = this.center, delta = 1) {
    const newRange = { ...this.range }

    /* translate */
    let dx = (this.center.x - location.x)
    let dy = (this.center.y - location.y)

    /* rotate */
    // const magnitude = sqrt(dx * dx + dy * dy)
    // const angle = atan2(dy, dx)
    //
    // dx = magnitude * cos(angle - rotation)
    // dy = magnitude * sin(angle - rotation)
    //
    /* scale */
    // dx /= current.scale
    // dy /= current.scale

    const newCenter = {
      x: location.x + dx * ZOOM_SIZE,
      y: location.y + dy * ZOOM_SIZE
    }

    if (sign(delta) < 0) {
      newRange.x *= ZOOM_SIZE
      newRange.y *= ZOOM_SIZE
    } else if (sign(delta) > 0) {
      newRange.x /= ZOOM_SIZE
      newRange.y /= ZOOM_SIZE
    }

    return Viewport.create({
      center: newCenter,
      range: newRange,
      rotation: this.rotation
    })
  },

  zoomOut (location = this.center) {
    const newRange = {
      x: this.range.x / ZOOM_SIZE,
      y: this.range.y / ZOOM_SIZE
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

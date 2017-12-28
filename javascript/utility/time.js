let times = {}

export function advanceTime (name, seconds) {
  times[name] = times[name] || 0
  times[name] += seconds

  return times[name]
}

export function getTime (name) { return times[name] || 0 }

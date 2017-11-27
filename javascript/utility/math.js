const { PI: pi, sin } = Math

export const sinusoid = ({ amplitude, animated, value, frequency, phase, time, totalTimePaused = 0, pausedTime = 0 }) => {
  if (!time) { return value }

  /* eslint-disable operator-linebreak */
  const adjustedTime = animated ?
    time - totalTimePaused :
    pausedTime - totalTimePaused
  /* eslint-enable operator-linebreak */

  return value + amplitude * sin(2 * pi * frequency * adjustedTime + phase)
}

export const phaseForSmoothFrequencyChange = ({ f1, f2, phi1, t }) => {
  const phi2 = 2 * pi * t * (f1 - f2) + phi1

  return (2 * pi + phi2 % (2 * pi)) % (2 * pi)
}

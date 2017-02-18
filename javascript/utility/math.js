const { PI: pi, sin } = Math

export const sinusoid = ({ amplitude, animated, value, frequency, phase, time }) => {
  if (!animated || !time) { return value }

  return value + amplitude * sin(2 * pi * frequency * time + phase)
}

export const phaseForSmoothFrequencyChange = ({ f1, f2, phi1, t }) => {
  const phi2 = 2 * pi * t * (f1 - f2) + phi1

  return (2 * pi + phi2 % (2 * pi)) % (2 * pi)
}

const { PI: pi, sin } = Math

export const sinusoid = ({ amplitude, animated, value, frequency, phase, time }) => {
  if (!animated || !time) { return value }

  return value + amplitude * sin(2 * pi * frequency * time + phase)
}

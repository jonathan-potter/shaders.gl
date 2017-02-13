import React from 'react'
import MenuItemRange from 'components/MenuItemRange'

const { PI: pi } = Math

export default ({ config, name }) => {
  const { amplitude, frequency, max, min, phase, setValue, value } = config

  const onChangeValue = event => setValue({
    action: 'SET_CONFIG_VALUE',
    value: event.currentTarget.value,
    name
  })

  const onChangeAmplitude = event => setValue({
    action: 'SET_CONFIG_AMPLITUDE',
    value: event.currentTarget.value,
    name
  })

  const onChangePhase= event => setValue({
    action: 'SET_CONFIG_PHASE',
    value: event.currentTarget.value,
    name
  })

  const onChangeFrequency= event => setValue({
    action: 'SET_CONFIG_FREQUENCY',
    value: event.currentTarget.value,
    name
  })

  /* eslint-disable no-multi-spaces */
  return (
    <li className='menu-item'>
      <ul>
        <MenuItemRange onChange={onChangeValue}     name={`${name}_value`}     value={value}     min={min} max={max} />
        <MenuItemRange onChange={onChangeAmplitude} name={`${name}_amplitude`} value={amplitude} min={0}   max={(max - min) / 2} />
        <MenuItemRange onChange={onChangePhase}     name={`${name}_phase`}     value={phase}     min={0}   max={2 * pi} />
        <MenuItemRange onChange={onChangeFrequency} name={`${name}_frequency`} value={frequency} min={0}   max={1} />
      </ul>
    </li>
  )
}

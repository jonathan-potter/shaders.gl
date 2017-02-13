import React from 'react'
import { connect } from 'react-redux'
import MenuItemRange from 'components/MenuItemRange'
import * as actions from 'actions'

import './MenuRangeVariable.css'

const { PI: pi } = Math

export default connect(() => ({}), actions)(({ config, name, setValue }) => {
  const { amplitude, frequency, max, min, phase, value } = config

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

  const onChangePhase = event => setValue({
    action: 'SET_CONFIG_PHASE',
    value: event.currentTarget.value,
    name
  })

  const onChangeFrequency = event => setValue({
    action: 'SET_CONFIG_FREQUENCY',
    value: event.currentTarget.value,
    name
  })

  /* eslint-disable no-multi-spaces */
  return (
    <li className='menu-item menu-range-variable'>
      <div>{name}</div>
      <ul>
        <MenuItemRange onChange={onChangeValue}     name='value'     value={value}     min={min} max={max} />
        <MenuItemRange onChange={onChangeAmplitude} name='amplitude' value={amplitude} min={0}   max={(max - min) / 2} />
        <MenuItemRange onChange={onChangePhase}     name='phase'     value={phase}     min={0}   max={2 * pi} />
        <MenuItemRange onChange={onChangeFrequency} name='frequency' value={frequency} min={0}   max={1} />
      </ul>
    </li>
  )
})

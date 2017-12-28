import React from 'react'
import { connect } from 'react-redux'
import MenuItemRange from 'components/MenuItemRange'
import * as actions from 'actions'

import './MenuRangeVariable.scss'

const { PI: pi } = Math

export default connect(() => ({}), actions)(({ config, name, setValue }) => {
  const { amplitude, animated, frequency, max, min, phase, value } = config

  const onChangeValue = event => setValue({
    action: 'SET_CONFIG_VALUE',
    value: parseFloat(event.currentTarget.value),
    name
  })

  const onChangeAmplitude = event => setValue({
    action: 'SET_CONFIG_AMPLITUDE',
    value: parseFloat(event.currentTarget.value),
    name
  })

  const onChangePhase = event => setValue({
    action: 'SET_CONFIG_PHASE',
    value: parseFloat(event.currentTarget.value),
    name
  })

  const onChangeFrequency = event => setValue({
    action: 'SET_CONFIG_FREQUENCY',
    value: parseFloat(event.currentTarget.value),
    name
  })

  const onChangeAnimate = event => setValue({
    action: 'SET_CONFIG_ANIMATE',
    value: event.currentTarget.checked,
    name
  })

  const onClickReset = event => setValue({
    action: 'SET_CONFIG_RESET',
    name
  })

  /* eslint-disable no-multi-spaces */
  return (
    <li className='menu-item menu-range-variable'>
      <div>
        <span className='menu-range-variable__name'>{name}</span>
        <button onClick={onClickReset} className='menu-range-variable__reset'>reset</button>
      </div>
      <ul>
        <li className='menu-range-variable__animate'>
          <label className='menu-range-variable__animate__label' htmlFor='animate'>animate</label>
          <input className='menu-range-variable__animate__checkbox' name='animate' onChange={onChangeAnimate} type='checkbox' checked={animated} />
        </li>
        <MenuItemRange onChange={onChangeValue}     name='value'     value={value}     min={min} max={max} />
        <MenuItemRange onChange={onChangeAmplitude} name='amplitude' value={amplitude} min={0}   max={(max - min) / 2} disabled={!animated} />
        <MenuItemRange onChange={onChangePhase}     name='phase'     value={phase}     min={0}   max={2 * pi} disabled={!animated} />
        <MenuItemRange onChange={onChangeFrequency} name='frequency' value={frequency} min={0}   max={1} disabled={!animated} />
      </ul>
    </li>
  )
})

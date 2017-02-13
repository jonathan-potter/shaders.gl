import React from 'react'

export default ({ min, max, name, onChange, value }) => {
  return (
    <li className='menu-item'>
      <div className='menu-item-label left'>
        <label htmlFor={name}>{name}</label>
      </div>
      <div className='menu-item-range left'>
        <input type='range'
          className='config-input'
          name={name}
          min={min}
          max={max}
          step='0.001'
          value={value}
          onChange={event => setConfigValue({
            value: event.currentTarget.value,
            name
          })} />
      </div>
    </li>
  )
}

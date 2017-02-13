import React from 'react'

export default ({ min, max, name, onChange, value }) => {
  return (
    <li className='menu-item-range'>
      <div className='menu-item-range__label'>
        <label htmlFor={name}>{name}</label>
      </div>
      <div className='menu-item-range__slider'>
        <input type='range'
          className='config-input'
          name={name}
          min={min}
          max={max}
          step='0.001'
          value={value}
          onChange={onChange} />
      </div>
    </li>
  )
}

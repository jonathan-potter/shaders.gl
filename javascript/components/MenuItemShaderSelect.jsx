import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import map from 'lodash/map'

export default connect(() => ({}), actions)(
  ({ currentShader, name, setCurrentShader, shaders }) => {
    const options = map(shaders, shader => shader)

    const optionElements = options.map(option => (
      <option key={option.name} value={option.name}>
        {option.name}
      </option>
    ))

    return (
      <li className='menu-item-select'>
        <label className='menu-item-select__label' htmlFor={name}>{name}</label>
        <div className='menu-item-select__select'>
          <select
            className={`${name}-selector`}
            type='select'
            name={name}
            value={shaders[currentShader] && shaders[currentShader].name}
            onChange={event => {
              const selectionOption = options[event.currentTarget.selectedIndex]

              setCurrentShader({
                shader: selectionOption.id
              })
            }}>
            {optionElements}
          </select>
        </div>
      </li>
    )
  }
)

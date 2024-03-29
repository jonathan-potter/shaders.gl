import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import { getCurrentShader, getShaderConfig } from 'reducers'
import map from 'lodash/map'

import './MenuItemSelect.scss'

const mapStateToProps = (state) => {
  const currentShader = getCurrentShader(state)

  return {
    config: getShaderConfig(state, currentShader.id)
  }
}

export default connect(mapStateToProps, actions)(({ config, name, options, setSelectValue }) => {
  const optionElements = map(options, (name, key) => (
    <option key={key} value={key}>
      {name}
    </option>
  ))

  return (
    <li className='menu-item menu-item-select'>
      <label className='menu-item-select__label' htmlFor={name}>{name}</label>
      <div className='menu-item-select__select'>
        <select
          className={`${name}-selector`}
          type='select'
          name={name}
          value={config[name]}
          onChange={event => setSelectValue({
            value: event.currentTarget.value,
            name
          })}>
          {optionElements}
        </select>
      </div>
    </li>
  )
})

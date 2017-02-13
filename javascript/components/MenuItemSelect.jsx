import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import { getCurrentShader, getShaderConfig } from 'reducers'
import map from 'lodash/map'

import './MenuItemSelect.css'

const mapStateToProps = (state) => ({
  config: getShaderConfig(state, getCurrentShader(state))
})

export default connect(mapStateToProps, actions)(({ config, name, options, setConfigValue }) => {
  const optionElements = map(options, (name, key) => (
    <option key={key} value={key}>
      {name}
    </option>
  ))

  return (
    <li className='menu-item menu-item-select'>
      <div className='menu-item-select__label'>
        <label htmlFor={name}>{name}</label>
      </div>
      <div className='menu-item-select__select'>
        <select
          className={`${name}-selector`}
          type='select'
          name={name}
          value={config[name]}
          onChange={event => setConfigValue({
            value: event.currentTarget.value,
            name
          })}>
          {optionElements}
        </select>
      </div>
    </li>
  )
})

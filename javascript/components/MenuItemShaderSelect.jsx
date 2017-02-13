import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import { getCurrentShader } from 'reducers'
import map from 'lodash/map'

const mapStateToProps = (state) => ({
  currentShader: getCurrentShader(state)
})

export default connect(mapStateToProps, actions)(
  ({ currentShader, name, options, setCurrentShader }) => {
    const optionElements = map(options, name => (
      <option key={name} value={name.toLowerCase()}>
        {name}
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
            value={currentShader}
            onChange={event => setCurrentShader({
              shader: event.currentTarget.value
            })}>
            {optionElements}
          </select>
        </div>
      </li>
    )
  }
)

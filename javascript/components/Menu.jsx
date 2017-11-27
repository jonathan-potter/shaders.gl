import React from 'react'
import { connect } from 'react-redux'
import { getCurrentShader, getShaderRangeSettings } from 'reducers'
import MenuRangeVariable from 'components/MenuRangeVariable'
import MenuItemSelect from 'components/MenuItemSelect'
import MenuItemShareGroup from 'components/MenuItemShareGroup'
import * as actions from 'actions'
import map from 'lodash/map'
import cn from 'classnames'

import './menu.scss'

const mapStateToProps = (state) => {
  const { currentShaderId, menuOpen, shaders } = state

  return {
    menuOpen,
    shaders,
    shader: getCurrentShader(state),
    rangeSettings: getShaderRangeSettings(state, currentShaderId)
  }
}

export default connect(mapStateToProps, actions)(
  ({ config, menuOpen, rangeSettings, resetShader, shader, shaders, zoomIn, zoomOut, zoomToLocation }) => {
    if (!shader || !rangeSettings) { return <div /> }

    const { menuOrder: MENU_ORDER, controls: CONTROLS } = shader.config.menu

    const controls = map(MENU_ORDER, name => {
      const {options, type} = CONTROLS[name]

      switch (type) {
        case 'range':
          const rangeSetting = rangeSettings[name]

          if (!rangeSetting) { return <div key={name} /> }

          return <MenuRangeVariable key={name} name={name} config={rangeSetting} />
        case 'select':
          return <MenuItemSelect key={name} name={name} options={options} />
      }
    })

    return (
      <menu className={cn('slide-out-menu', { 'menu-open': menuOpen })}>
        <ul className='menu-items'>
          <MenuItemShareGroup />
          <li className='menu-item zoom-button-group'>
            <button
              className='reset-button button-primary'
              onClick={zoomOut}>
              zoom out
            </button>
            <button
              className='reset-button button-primary'
              onClick={zoomIn}>
              zoom in
            </button>
            <button
              className='reset-button button-primary'
              onClick={resetShader}>
              reset
            </button>
          </li>
          { controls }
        </ul>
      </menu>
    )
  }
)

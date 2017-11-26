import React from 'react'
import { connect } from 'react-redux'
import { getCurrentShader, getShaderViewport, getPinchStart } from 'reducers'
import MenuItemShaderSelect from 'components/MenuItemShaderSelect'
import MenuRangeVariable from 'components/MenuRangeVariable'
import MenuItemSelect from 'components/MenuItemSelect'
import MenuItemShareGroup from 'components/MenuItemShareGroup'
import * as actions from 'actions'
import map from 'lodash/map'
import cn from 'classnames'

import './menu.scss'

const mapStateToProps = ({ currentShader, menuOpen, shaderSettings, shaders }) => ({
  currentShader,
  menuOpen,
  shaders,
  shaderSettings
})

export default connect(mapStateToProps, actions)(
  ({ config, currentShader, menuOpen, resetShader, shaders, shaderSettings, zoomIn, zoomOut, zoomToLocation }) => {
    const shader = shaders[currentShader]

    if (!shader) { return <div /> }

    const { menuOrder: MENU_ORDER, controls: CONTROLS } = shader.config.menu

    const controls = map(MENU_ORDER, (name) => {
      const {options, type} = CONTROLS[name]

      switch (type) {
        case 'range':
          const config = shader.config.settings.rangeSettings[name]
          return <MenuRangeVariable key={name} name={name} config={config} />
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
          <MenuItemShaderSelect name='shader' currentShader={currentShader} shaders={shaders} />
          { controls }
        </ul>
      </menu>
    )
  }
)

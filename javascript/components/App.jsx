import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Menu from 'components/Menu'
import CanvasContainer from 'components/CanvasContainer'

import 'assets/skeleton/skeleton.css'
import 'assets/skeleton/normalize.css'
import './App.scss'

export default connect(() => ({}), actions)(
  ({ shaderId, setCurrentShader, store }) => {
    setCurrentShader({ shader: shaderId })

    return (
      <div>
        <Menu />
        <CanvasContainer store={store} shaderId={shaderId} />
      </div>
    )
  }
)

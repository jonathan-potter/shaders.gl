import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Menu from 'components/Menu'
import CanvasContainer from 'components/CanvasContainer'

import 'assets/skeleton/skeleton.css'
import 'assets/skeleton/normalize.css'
import './App.scss'

export default connect(() => ({}), actions)(
  class App extends Component {
    componentDidMount () {
      const { shaderId, setCurrentShader } = this.props

      setCurrentShader({ shader: shaderId })
    }

    render () {
      const { shaderId, store } = this.props

      return (
        <div>
          <Menu />
          <CanvasContainer store={store} shaderId={shaderId} />
        </div>
      )
    }
  }
)

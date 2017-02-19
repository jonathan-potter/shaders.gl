import React, { Component } from 'react'
import Header from 'components/Header'
import Menu from 'components/Menu'
import CanvasContainer from 'components/CanvasContainer'

import './App.scss'

export default class App extends Component {
  componentDidMount () {
    this.props.initializeWebGL()
  }

  render () {
    return (
      <div>
        <Menu />
        <div className='content'>
          <Header />
          <CanvasContainer />
        </div>
      </div>
    )
  }
}

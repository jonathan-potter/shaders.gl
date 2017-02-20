import React, { Component } from 'react'
import Header from 'components/Header'
import Menu from 'components/Menu'
import CanvasContainer from 'components/CanvasContainer'

import 'assets/skeleton/skeleton.css'
import 'assets/skeleton/normalize.css'
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

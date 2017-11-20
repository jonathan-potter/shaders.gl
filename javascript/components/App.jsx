import React from 'react'
import Header from 'components/Header'
import Menu from 'components/Menu'
import CanvasContainer from 'components/CanvasContainer'

import 'assets/skeleton/skeleton.css'
import 'assets/skeleton/normalize.css'
import './App.scss'

export default ({ shaderId, store }) => (
  <div>
    <Menu />
    <div className='content'>
      <Header />
      <CanvasContainer store={store} shaderId={shaderId} />
    </div>
  </div>
)

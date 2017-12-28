import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import initializeWebGL from 'webgl/initializeWebGL'
import * as actions from 'actions'

import './ShaderList.scss'

const mapStateToProps = ({ shaders }) => ({ shaders })

export default connect(mapStateToProps, actions)(
  ({ setCurrentShader, shaderId, shaders, store }) => {
    return (
      <ul className='container shader-list'>
        {Object.values(shaders).map(shader => <ListItem key={shader.id} shader={shader} store={store} />)}
      </ul>
    )
  }
)

class ListItem extends Component {
  componentDidMount () {
    const { shader, store } = this.props
    const { canvas } = this.refs

    initializeWebGL({
      canvas,
      shaderId: shader.id,
      singleFrame: true,
      store
    })
  }

  render () {
    const { shader } = this.props

    return (
      <Link className='shader-card' to={`/shader/${shader.id}`}>
        <canvas width='300' height='200' ref='canvas' className='shader-card__canvas' />
        <div className='shader-card__hero'>
          <span className='shader-card__title'>{shader.name}</span>
        </div>
      </Link>
    )
  }
}

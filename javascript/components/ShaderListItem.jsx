import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import initializeWebGL from 'webgl/initializeWebGL'
import * as actions from 'actions'

class ShaderListItem extends Component {
  componentDidMount () {
    const { shader, store } = this.props
    const { canvas } = this.refs

    initializeWebGL({
      canvas,
      shaderId: shader.id,
      singleFrame: true,
      smallFrame: true,
      store
    })
  }

  render () {
    const { shader } = this.props
    console.log(this.props)

    return (
      <Link onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} className='shader-card' to={`/shader/${shader.id}`}>
        <canvas width='300' height='200' ref='canvas' className='shader-card__canvas' />
        <div className='shader-card__hero'>
          <span className='shader-card__title'>{shader.name}</span>
        </div>
      </Link>
    )
  }

  onMouseOver = () => {
    const { shader, store } = this.props
    const { canvas } = this.refs

    initializeWebGL({
      canvas,
      shaderId: shader.id,
      smallFrame: true,
      store
    })
  }

  onMouseOut = () => {
    this.props.resetRenderId()
  }
}

export default connect(() => ({}), actions)(ShaderListItem)

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'actions'

import './ShaderList.scss'

const mapStateToProps = ({ shaders }) => ({ shaders })

export default connect(mapStateToProps, actions)(
  ({ match, setCurrentShader, shaders }) => {
    setCurrentShader({ shader: match.params.shader_id || null })

    return (
      <ul className='shader-list'>
        {Object.values(shaders).map(shader => <ListItem key={shader.id} shader={shader} />)}
      </ul>
    )
  }
)

function ListItem ({ shader }) {
  return (
    <Link className='shader-card' to={`/shader/${shader.id}`}>
      <canvas className='shader-card__canvas' />
      <div className='shader-card__hero'>
        <span className='shader-card__title'>{shader.name}</span>
      </div>
    </Link>
  )
}

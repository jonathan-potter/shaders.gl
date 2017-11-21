import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'actions'

const mapStateToProps = ({ shaders }) => ({ shaders })

export default connect(mapStateToProps, actions)(
  ({ match, setCurrentShader, shaders }) => {
    setCurrentShader({ shader: match.params.shader_id || null })

    return (
      <ul>
        {Object.values(shaders).map(shader => <ListItem key={shader.id} shader={shader} />)}
      </ul>
    )
  }
)

function ListItem ({ shader }) {
  return (
    <li>
      <Link to={`/shader/${shader.id}`}>{shader.name}</Link>
    </li>
  )
}

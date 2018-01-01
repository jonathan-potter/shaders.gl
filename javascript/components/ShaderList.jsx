import React from 'react'
import { connect } from 'react-redux'
import ShaderListItem from 'components/ShaderListItem'
import * as actions from 'actions'

import './ShaderList.scss'

const mapStateToProps = ({ shaders }) => ({ shaders })

export default connect(mapStateToProps, actions)(
  ({ shaders, store }) => {
    return (
      <ul className='container shader-list'>
        {Object.values(shaders).map(shader => <ShaderListItem key={shader.id} shader={shader} store={store} />)}
      </ul>
    )
  }
)

import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'components'
import configureStore from 'utility/configureStore'
import initializeWebGL from 'webgl/initializeWebGL'
import { Shader } from 'network'
import { ShaderActions } from 'actions'

const store = configureStore()

Shader.all().then(shaders => {
  shaders.forEach(shader => ShaderActions.create(shader)(store.dispatch))
})

const initialize = ({ canvas }) => initializeWebGL({ store, canvas })

ReactDOM.render(
  <Root
    store={store}
    initializeWebGL={initialize} />,
  document.getElementById('root')
)

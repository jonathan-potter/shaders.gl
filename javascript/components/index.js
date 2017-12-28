import React from 'react'
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom'
import Header from 'components/Header'
import { Provider } from 'react-redux'
import App from 'components/App'
import ShaderList from 'components/ShaderList'

export default ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <HashRouter>
        <div>
          <Route exact path='/' component={wrap(ShaderList, store)} />
          <Route path='/shader/:shader_id' component={wrap(App, store)} />
        </div>
      </HashRouter>
    </div>
  </Provider>
)

function wrap (component, store) {
  return ({ match }) => (
    React.createElement(component, {
      shaderId: match.params.shader_id,
      store
    })
  )
}

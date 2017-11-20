import React from 'react'
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from 'components/App'
import ShaderList from 'components/ShaderList'

export default function ({ store }) {
  const something = ({ match }) => (
    <App shaderId={match.params.shader_id} store={store} />
  )

  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Route exact path='/' component={ShaderList} />
          <Route path='/shader/:shader_id' component={something} />
        </div>
      </HashRouter>
    </Provider>
  )
}

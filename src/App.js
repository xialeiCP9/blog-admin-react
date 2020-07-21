import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import './assets/less/globar.less'

function App (props) {
  return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" component={Main} />
      </Switch>
  )
}

export default App

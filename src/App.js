// Imports

import React, { Component }                       from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import home                                       from './pages/home.js'
import login                                      from './pages/login.js'
import signup                                     from './pages/signup.js'
import './App.css'



// ---------------------------------------------------------------------------------------------------------

// App

class App extends Component {

  render () {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={home} />
            <Route exact path='/login' component={login} />
            <Route exact path='/signup' component={signup} />
          </Switch>
        </Router>
      </div>
    )

  }
}



// ---------------------------------------------------------------------------------------------------------

// Exports

export default App

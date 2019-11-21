// Imports

import React, { Component }                       from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider }      from '@material-ui/core/styles'
import Navbar                                     from './components/Navbar.js';
import AuthRoute                                  from './util/AuthRoute'
import home                                       from './pages/home.js'
import login                                      from './pages/login.js'
import signup                                     from './pages/signup.js'
import './App.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode      from 'jwt-decode'



// ---------------------------------------------------------------------------------------------------------

// Theme

const theme = createMuiTheme({

  palette: {
    primary: {
      light:        '#33c9dc',
      main:         '#00bcd4',
      dark:         '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light:        '#ff6333',
      main:         '#ff3d00',
      dark:         '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }

})

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}



// ---------------------------------------------------------------------------------------------------------

// App

class App extends Component {

  render () {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
                <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )

  }
}



// ---------------------------------------------------------------------------------------------------------

// Exports

export default App

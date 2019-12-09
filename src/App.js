// Imports

import React, { Component }                       from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider }      from '@material-ui/core/styles'
import Navbar                                     from './components/Navbar.js';
import AuthRoute                                  from './util/AuthRoute'
import home                                       from './pages/home.js'
import login                                      from './pages/login.js'
import signup                                     from './pages/signup.js'
import createMuiTheme                             from '@material-ui/core/styles/createMuiTheme';
import jwtDecode                                  from 'jwt-decode'
import { Provider }                               from 'react-redux'
import store                                      from './redux/store'
import { SET_AUTHENTICATED }                      from './redux/types'
import { logoutUser, getUserData }                from './redux/actions/userActions'
import axios                                      from 'axios';
import './App.css'



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


const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}



// ---------------------------------------------------------------------------------------------------------

// App

class App extends Component {

  render () {

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login}/>
                <AuthRoute exact path='/signup' component={signup}/>
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )

  }
}



// ---------------------------------------------------------------------------------------------------------

// Exports

export default App

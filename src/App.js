// Imports

import React, { Component }                       from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider                           from '@material-ui/core/styles/MuiThemeProvider'
import createTheme                                from '@material-ui/core/styles/createMuiTheme'
import Navbar                                     from './components/Navbar.js';
import home                                       from './pages/home.js'
import login                                      from './pages/login.js'
import signup                                     from './pages/signup.js'
import './App.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';



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
  }

})



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
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />
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

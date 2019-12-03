import React, { Component } from 'react'
import { Route, Redirect }  from 'react-router-dom'



// ---------------------------------------------------------------------------------------------------------

// Auth Route

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (

    <Route
        {...rest}
        render= {(props) => 
            authenticated === true ? <Redirect to='/'/> : <Component {...props}/>
        }
    />

)



// ---------------------------------------------------------------------------------------------------------

// Exports

export default AuthRoute

import React from 'react'

import {Route, Redirect } from 'react-router-dom'
import { useAppContext } from '../../libs/contextLib'

const PrivateRoute = ({component:Component, ...rest}) =>
{
    const{isAuthenticated, currentlyAuthenticating} = useAppContext
    return (
        <Route {...rest} render={props => !isAuthenticated && !currentlyAuthenticating ?
            (<Redirect to="/home" />) :
    (<Component {...props}/>)} />
        
    )
}

export default PrivateRoute;

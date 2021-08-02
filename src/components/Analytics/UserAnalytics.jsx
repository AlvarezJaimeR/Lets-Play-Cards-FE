import React from 'react'
import { useAppContext } from '../../libs/contextLib'
const UserAnalytics = ({}) =>
{
const { isAuthenticated,
    userHasAuthenticated,
    loggedInUser} = useAppContext()

    return (
        <div>{( isAuthenticated &&
            userHasAuthenticated&&
            loggedInUser) && <div>
            </div>}
    
</div>)

}

export default UserAnalytics
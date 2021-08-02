import React, {useEffect} from 'react'
import { useAppContext } from '../../libs/contextLib'
import '../Screens/screens.css'
const UserAnalytics = ({ }) => {
     
    const { isAuthenticated,
    userHasAuthenticated,
    loggedInUser} = useAppContext()
        
        useEffect(() =>
        {
    
    console.log(loggedInUser)
}, [loggedInUser])

    return (
        <div>{( isAuthenticated &&
            userHasAuthenticated&&
            loggedInUser) && <div className="analytics-container">
            <h2>My Game statistics</h2>
            <strong>Name:</strong>{loggedInUser.userName}<br/>
            <strong>Total Games:</strong>{loggedInUser.games}<br/>
            <strong>Total Wins:</strong>{loggedInUser.wins}<br/>
            <strong>Total Loses:</strong>{loggedInUser.loses}
            </div>}
    
</div>)

}

export default UserAnalytics
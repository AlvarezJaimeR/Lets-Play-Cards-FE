import React, { useState } from 'react'
import jwtDecode from "jwt-decode";
import  {AppContext} from './contextLib';
import axios from 'axios';

const AuthState=(props) =>
{
    const [totalUsers, setTotalUsers] = useState([]);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [jwt, setJwt] = useState(() => localStorage.getItem("token"));
    
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [headers, setHeaders] = useState();
  
    const onLoad = async () =>{
        try {
         const res =  await axios.get("http://localhost:5000/api/users/").then((response) => {
			setTotalUsers(res.data);
		});
        } catch (error) {
           if (error){console.log(error.message)} 
        }
		
	}


    const loadUser = async ()=> {
        if (jwt !== null) {
          try {
            await setLoggedInUser(jwtDecode(jwt));
            userHasAuthenticated(true);
          			} catch(error){
			  console.log(error);
			}
		  }
			setHeaders({
			  headers:{
				"Content-Type": "application/json",
				"x-auth-token": `${jwt}`,
			  },
			});
	}
       
      


    return (
        <AppContext.Provider
            value={{
            totalUsers,
            isAuthenticated,
            userHasAuthenticated,
            loadUser,
            onLoad
          }}>
           {props.children}
        </AppContext.Provider>
    )
}

export default AuthState

import React, {useState, useEffect} from "react";
import "../components/app.css"
import {Switch, Route} from "react-router-dom";
import Home from "../components/Screens/Home"
import Register from "./Register/Register";
import Login from "./Login/Login";
import Game from "./Game/Game";
import {AppContext} from "../libs/contextLib";
import jwtDecode from "jwt-decode";
import PrivateRoute from  './Routing/PrivateRoute';
import AllUsers from "./AllUsers/AllUsers";

function App(){
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState(() => localStorage.getItem("token"));
  const [currentlyAuthenticating, setCurrentlyAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [headers, setHeaders] = useState();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (jwt !== null) {
      try {
        setLoggedInUser(jwtDecode(jwt));
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
  }, [jwt]);

  async function onLoad() {
    if (jwt != null) {
      try {
        await setLoggedInUser(jwtDecode(jwt));
        userHasAuthenticated(true);
      } catch (error) {
        if (error !== "InvalidTokenError: Invalid token specified");
      }
    }
    setCurrentlyAuthenticating(false);
  }

  return (
    !currentlyAuthenticating && (
   <div>
      <AppContext.Provider
      value={{
        isAuthenticated,
        userHasAuthenticated,
        loggedInUser,
        setLoggedInUser,
        jwt,
        setJwt,
        headers,
        setHeaders,
      }}>
          <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/home" component={Home}/>
           <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/game" component={Game} />
          <Route path="/allUsers" component={AllUsers} />
        </Switch>
      </AppContext.Provider>
    </div>
    )
  )
}
export default App;

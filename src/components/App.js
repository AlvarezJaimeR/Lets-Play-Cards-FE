import React, {useState, useEffect} from "react";
import "../components/app.css"
import {Switch, Route} from "react-router-dom";
import Home from "../components/Screens/Home"
import Register from "./Register/Register";
import Login from "./Login/Login";
import Game from "./Game/Game";

import jwtDecode from "jwt-decode";
import AuthState from "../libs/AuthState";

function App(){
  

  return (
  
   <div>
      <AuthState>
        <Switch>
          <Route path="/home" component={Home}/>
           <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/game" component={Game} />
        </Switch>
      </AuthState>
    </div>
    )
  
}
export default App;

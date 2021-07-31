import React from "react";

import "../components/app.css"

import {Switch, Route} from "react-router-dom";
import Home from "../components/Screens/Home"

import Register from "./Register/Register";
import Login from "./Login/Login";
import Game from "./Game/Game";

function App()
{
  

  return (
   <div>
      <div>
        <Switch>
          <Route path="/home" component={Home}/>
           <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/game" component={Game} />
        </Switch>
      </div>  
  
    
    </div>
  )
}
export default App;

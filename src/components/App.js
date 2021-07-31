import React, { useEffect, useState } from "react";
import {Switch, Route} from "react-router-dom";
import axios from "axios";
import Register from "./Register/Register";

function App() {
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    await axios.get("http://localhost:5000/api/users/")
      .then((response) => {
        console.log("all users", response.data);
        setTotalUsers(response.data);
      });
  }

  return (
    totalUsers.length > 0 ? (
    <div>
      <h1>Hello World!</h1>
        <div>
          {totalUsers.map((user, index) => {
            return (
            <div 
              key={index}>
                <h2>
                  {user.userName}
                </h2>
            </div>
          )})} 
        </div>
        <div>
          <Switch>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>
    </div>
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  );
}

export default App;

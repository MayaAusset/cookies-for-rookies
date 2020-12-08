import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';


import RecipesList from '../Recipes/RecipesList';
import RecipeDetail from '../Recipes/RecipeDetail';
import Navbar from '../NavBar/Navbar';

import ProtectedRoute from "../Auth/ProtectedRoute";
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';


import AuthService from '../../services/auth.service';
import HomePage from '../NavBar/HomePage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getLoggedInUser = (userObject) => setLoggedInUser(userObject);

  fetchUser();

  return loggedInUser ? (
      
      <section className="App">
      <div className="main-background">
      <img className="nav-img" src="/Background-img.jpg" alt="background" width="100%" />
      <h1 className="big-title centered">COOKIES FOR ROOKIES</h1>
      </div>
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
        
        <Switch>
          <ProtectedRoute
            user={loggedInUser}
            path="/recipes/:id"
            component={RecipeDetail}
          />
          <ProtectedRoute
            user={loggedInUser}
            path="/recipes"
            component={RecipesList}
          />
        </Switch>
      </section>
    ) : (
      <section className="App ">
      <div className="main-background">
      <img className="nav-img" src="/Background-img.jpg" alt="background" width="100%" />
      <h1 className="big-title centered">COOKIES FOR ROOKIES</h1>
      </div>
        <HomePage/>
        <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
        

        <Switch>
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={getLoggedInUser} />}
          />
          <Route
            exact
            path="/"
            render={() => <Login getUser={getLoggedInUser} />}
          />
          <ProtectedRoute
            user={loggedInUser}
            path="/recipes/:id"
            component={RecipeDetail}
          />
          <ProtectedRoute
            user={loggedInUser}
            path="/recipes"
            component={RecipesList}
          />
        </Switch>
      </section>
  );
}

export default App;

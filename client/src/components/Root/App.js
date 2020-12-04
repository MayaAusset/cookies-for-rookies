import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import RecipesList from '../Recipes/RecipesList';
import RecipeDetail from '../Recipes/RecipeDetail';
import Navbar from '../NavBar/Navbar';

import Signup from '../Auth/Signup';

function App() {
  const [isLoggedInUser, setLoggedInUser] = useState(null);

  const getLoggedInUser = (userObject) => setLoggedInUser(userObject);

  return (
    <div className="App">
     <h1 className="title">COOKIES FOR ROOKIES</h1>
     <Navbar/>
  
    <Switch>
      <Route
      path='/signup' 
      render={() => <Signup getUser={getLoggedInUser} />} 
      />
      <Route exact path="/recipes" component={RecipesList} />
      <Route path="/recipes/:id" component={RecipeDetail} />
    </Switch>

    </div>
  );
}

export default App;

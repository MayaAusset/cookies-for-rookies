import './App.css';
import { Switch, Route } from 'react-router-dom';

import RecipesList from '../Recipes/RecipesList';
import RecipeDetail from '../Recipes/RecipeDetail';
import Navbar from '../NavBar/Navbar';

function App() {
  return (
    <div className="App">
     <h1 className="title">COOKIES FOR ROOKIES</h1>
     <Navbar/>
  
    <Switch>
      <Route exact path="/recipes" component={RecipesList} />
      <Route path="/recipes/:id" component={RecipeDetail} />
    </Switch>

    </div>
  );
}

export default App;

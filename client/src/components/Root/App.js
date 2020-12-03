import './App.css';

import RecipesList from '../Recipes/RecipesList';

function App() {
  return (
    <div className="App">
     <h1 className="title">COOKIES FOR ROOKIES</h1>
     <h1>Recipes: </h1>
     <RecipesList />
    </div>
  );
}

export default App;

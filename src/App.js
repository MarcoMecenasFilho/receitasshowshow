import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import Favorites from './pages/Favorites';
import Foods from './pages/Foods';
import IngredientsFood from './pages/IngredientsFood';
import IngredientsDrinks from './pages/IngredientsDrinks';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipesMade from './pages/RecipesMade';
import Login from './pages/Login';
import AppProvider from './context/AppProvider';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import ExploreArea from './pages/ExploreArea';
import NotFound from './pages/NotFound';
import DrinkDetails from './pages/DrinkDetails';
import NewUser from './pages/NewUser';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ RecipeDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsFood }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsDrinks }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreArea } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
        <Route exact path="/newuser" component={ NewUser } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </AppProvider>
  );
}

export default App;

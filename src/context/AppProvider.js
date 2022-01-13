import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  // Use vários useStates
  // Crie nomes autoexplicativos
  // Passe os estados dentro da variável context
  const [mealResults, setMealsResults] = useState([]);
  const [drinksResults, setDrinksResults] = useState([]);
  const [ingredientFilter, setIngredientFilter] = useState('');
  const [
    favorites,
    setFavorites,
  ] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));

  const context = {
    mealResults,
    setMealsResults,
    drinksResults,
    setDrinksResults,
    favorites,
    setFavorites,
    ingredientFilter,
    setIngredientFilter,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};

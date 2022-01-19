import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [mealResults, setMealsResults] = useState([]);
  const [drinksResults, setDrinksResults] = useState([]);
  const [ingredientFilter, setIngredientFilter] = useState('');

  const context = {
    mealResults,
    setMealsResults,
    drinksResults,
    setDrinksResults,
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

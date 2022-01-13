import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import AppContext from '../context/AppContext';

const MAX_LENGTH = 12;

export default function IngredientsDrinks() {
  const { setDrinksResults } = useContext(AppContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const history = useHistory();

  function fetchIngredientsList() {
    try {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json())
        .then((result) => setIngredientsList(result.drinks.slice(0, MAX_LENGTH)));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchIngredientsList();
  }, []);
  console.log(ingredientsList);
  function fetchByIngredients(searchValue) {
    try {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`)
        .then((response) => response.json())
        .then((result) => setDrinksResults(result.drinks));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <ProfileLink />
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </header>
      {
        ingredientsList && (
          ingredientsList.map((ingredient, index) => (
            <button
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              type="button"
              onClick={ () => {
                history.push('/bebidas');
                fetchByIngredients(ingredient.strIngredient1);
              } }
            >
              <img src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } alt="" data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1}</p>
            </button>
          ))
        )
      }
      <Footer />
    </>
  );
}

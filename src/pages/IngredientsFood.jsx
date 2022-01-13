import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import AppContext from '../context/AppContext';

const MAX_LENGTH = 12;

export default function IngredientsFood() {
  const { setMealsResults } = useContext(AppContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const history = useHistory();

  function fetchIngredientsList() {
    try {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json())
        .then((result) => setIngredientsList(result.meals.slice(0, MAX_LENGTH)));
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
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
        .then((response) => response.json())
        .then((result) => setMealsResults(result.meals));
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
                history.push('/comidas');
                fetchByIngredients(ingredient.strIngredient);
              } }
            >
              <img src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` } alt="" data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient}</p>
            </button>
          ))
        )
      }
      <Footer />
    </>
  );
}

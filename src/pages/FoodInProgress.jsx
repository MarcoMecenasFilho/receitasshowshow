import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/inProgresspages.css';
import getRecipesIngredients from '../service/getRecipeIngredients';
import { favoriteFood,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { doneFood } from '../service/doneRecipesFunctions';
import { clickMealBox, checkedBox } from '../service/checkBoxFunctions';
import { totalSteps,
  checkBoxSteepsDone, checkLocalStore } from '../service/localStorageFunctions';
import shareIcon from '../images/iconCompartilhar.png';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';

export default function FoodInProgress() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [totalIngredients, setTotalIngredients] = useState(0);
  const [incrementIngredients, setIncrementIngredients] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const page = history.location.pathname;
  const id = page.split('/')[2];

  function inialState() {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setRecipeApi(result.meals[0]);
        return result.meals[0];
      })
      .then((res) => (totalSteps(res, setTotalIngredients)))
      .then(() => (checkBoxSteepsDone(id, setIncrementIngredients, 'meals')))
      .then(() => (favoriteCheckRecipe(id, setIsFavorite)))
      .then(() => setValidate(true));
  }

  useEffect(() => {
    checkLocalStore();
    inialState();
    // eslint-disable-next-line
  }, []);

  function clickCheckBox(e) {
    clickMealBox(e, id, setIncrementIngredients, incrementIngredients);
  }

  function statusCheckBox(value) {
    return checkedBox(value, id, 'meals');
  }

  function favoriteMeals() {
    favoriteFood(id, recipeApi, setIsFavorite);
  }

  function clickDone() {
    doneFood(id, recipeApi);
    history.push('/receitas-feitas');
  }

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipeApi;

  const infosMeal = (
    <div className="inprogress-details">
      <div className="div-img">
        <img data-testid="recipe-photo" src={ strMealThumb } alt="" />
      </div>
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <h2>Ingredients:</h2>
      <div className="ingredient-measure">
        <div>
          {getRecipesIngredients(recipeApi).map((ingredient, index) => (

            <li
              key={ ingredient.name }
              data-testid={ `${index}-ingredient-step` }
            >
              <p
                className={ statusCheckBox(`${ingredient.name} - ${ingredient.quantity}`)
                && 'scratched' }
              >
                {ingredient.name}
                -
                {ingredient.quantity}
              </p>
              <input
                type="checkbox"
                value={ `${ingredient.name} - ${ingredient.quantity}` }
                onClick={ (e) => clickCheckBox(e) }
                checked={ statusCheckBox(`${ingredient.name} - ${ingredient.quantity}`) }
              />
            </li>

          ))}
        </div>
      </div>
      <h2>Instructions</h2>
      <p
        data-testid="instructions"
        className="instructions-inprogress"
      >
        {strInstructions}

      </p>
      {displayMessage && <p className="copy-link">Link copiado!</p>}
      <div className="btns-div">
        <button
          type="button"
          className="finish-btn"
          data-testid="finish-recipe-btn"
          disabled={ incrementIngredients !== totalIngredients }
          onClick={ () => clickDone() }
        >
          Finish
        </button>
        <button
          type="button"
          className="fav-btn-progress"
          onClick={ () => favoriteMeals() }
          data-testid="favorite-btn"
          src={ isFavoriteIcon(isFavorite) }
        >
          <img src={ isFavoriteIcon(isFavorite) } alt="" />

        </button>
        <button
          type="button"
          className="share-btn-progress"
          value={ `http://localhost:3000/comidas/${id}` }
          onClick={ ({ currentTarget }) => {
            navigator.clipboard.writeText(currentTarget.value);
            setDisplayMessage(true);
          } }
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="" />
        </button>
        <div className="profilelink-progress">
          <ProfileLink />
        </div>
      </div>
    </div>);

  return (
    <div>
      {validate && infosMeal}
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getRecipeIngredients from '../service/getRecipeIngredients';
import { favoriteCockTail,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { clickCocktailsBox, checkedBox } from '../service/checkBoxFunctions';
import doneDrink from '../service/doneRecipesFunctions';
import { checkLocalStore,
  totalSteps, checkBoxSteepsDone } from '../service/localStorageFunctions';

export default function DrinkInProgress() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [totalIngredients, setTotalIngredients] = useState(0);
  const [incrementIngredients, setIncrementIngredients] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const page = history.location.pathname;
  const id = page.split('/')[2];

  function inicialStates() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setRecipeApi(result.drinks[0]);
        return result.drinks[0];
      })
      .then((res) => (totalSteps(res, setTotalIngredients)))
      .then(() => (checkBoxSteepsDone(id, setIncrementIngredients, 'cocktails')))
      .then(() => (favoriteCheckRecipe(id, setIsFavorite)))
      .then(() => setValidate(true));
  }

  useEffect(() => {
    checkLocalStore();
    inicialStates();
    // eslint-disable-next-line
  }, []);

  function clickCheckBox(e) {
    clickCocktailsBox(e, id, setIncrementIngredients, incrementIngredients);
  }

  function StatusCheckBox(value) {
    return checkedBox(value, id, 'cocktails');
  }

  function favoriteClick() {
    favoriteCockTail(id, recipeApi, setIsFavorite);
  }

  function clickDone() {
    doneDrink(id, recipeApi);
    history.push('/receitas-feitas');
  }

  const {
    strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipeApi;
  const infosMeal = (
    <div>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <p>{strAlcoholic}</p>
      <h2>Ingredientes:</h2>
      <div className="ingredient-measure">
        <div>
          {getRecipeIngredients(recipeApi)
            .map((ingredient, index) => (

              <li
                key={ ingredient.name }
                data-testid={ `${index}-ingredient-step` }
              >
                <p>
                  {ingredient.name}
                  {' '}
                  -
                  {' '}
                  {ingredient.quantity}

                </p>
                <input
                  value={ `${ingredient.name} - ${ingredient.quantity}` }
                  type="checkbox"
                  onClick={ (e) => clickCheckBox(e) }
                  checked={ StatusCheckBox(
                    `${ingredient.name} - ${ingredient.quantity}`,
                  ) }
                />
              </li>

            ))}
        </div>
      </div>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ incrementIngredients !== totalIngredients }
        onClick={ () => clickDone() }
      >
        Finalizar

      </button>
      <button
        type="button"
        value={ `http://localhost:3000/bebidas/${id}` }
        onClick={ ({ currentTarget }) => {
          navigator.clipboard.writeText(currentTarget.value);
          setDisplayMessage(true);
        } }
        data-testid="share-btn"
      >
        Compartilhar!!!

      </button>
      <button
        type="button"
        onClick={ () => favoriteClick() }
        data-testid="favorite-btn"
        src={ isFavoriteIcon(isFavorite) }
      >
        favoritar

      </button>
    </div>);

  return (
    <div>
      {validate && infosMeal}
      {displayMessage && <p>Link copiado!</p>}
    </div>
  );
}

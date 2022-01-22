import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getRecipeIngredients from '../service/getRecipeIngredients';
import { favoriteCockTail,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { clickCocktailsBox, checkedBox } from '../service/checkBoxFunctions';
import ProfileLink from '../components/ProfileLInk';
import doneDrink from '../service/doneRecipesFunctions';
import shareIcon from '../images/iconCompartilhar.png';
import { checkLocalStore,
  totalSteps, checkBoxSteepsDone } from '../service/localStorageFunctions';
import Footer from '../components/Footer';

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

  const url = window.location.href;
  const urlSplit = url.split('/in-progress');

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

  function statusCheckBox(value) {
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
  const infosDrink = (
    <div className="inprogress-details inprogress-back-drinks">
      <div className="div-img">
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
      </div>
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h5 data-testid="recipe-category">{strCategory}</h5>
      <p className="isAlcoholic">{strAlcoholic}</p>
      <h2>Ingredientes:</h2>
      <div className="ingredient-measure">
        <div>
          {getRecipeIngredients(recipeApi)
            .map((ingredient, index) => (

              <li
                key={ ingredient.name }
                data-testid={ `${index}-ingredient-step` }
              >
                <p
                  className={
                    statusCheckBox(`${ingredient.name} - ${ingredient.quantity}`)
                && 'scratched'
                  }
                >
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
                  checked={ statusCheckBox(
                    `${ingredient.name} - ${ingredient.quantity}`,
                  ) }
                />
              </li>

            ))}
        </div>
      </div>
      <h2>Instruções</h2>
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
          Finalizar
        </button>
        <button
          type="button"
          onClick={ () => favoriteClick() }
          data-testid="favorite-btn"
          className="fav-btn-progress"
          src={ isFavoriteIcon(isFavorite) }
        >
          <img src={ isFavoriteIcon(isFavorite) } alt="" />
        </button>
        <button
          type="button"
          className="share-btn-progress"
          value={ urlSplit[0] }
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
      {validate && infosDrink}
      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import '../styles/DetailsCard.css';
import '../styles/drinkDetails.css';
import { favoriteFood,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { checkLocalStore } from '../service/localStorageFunctions';
import { checkButtonStartMeal } from '../service/StartButtonFunction';
import shareIcon from '../images/shareIcon.svg';
import CarouselMeal from '../components/CarouselMeal';

export default function RecipeDetails() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgress, setInprogress] = useState(false);
  const [doneButtonHide, setDoneButtonHide] = useState(true);
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
      .then(() => (favoriteCheckRecipe(id, setIsFavorite)))
      .then(() => checkButtonStartMeal(id, setDoneButtonHide, setInprogress))
      .then(() => setValidate(true));
  }

  useEffect(() => {
    checkLocalStore();
    inialState();
    // eslint-disable-next-line
  }, [id]);

  function favoriteMeals() {
    favoriteFood(id, recipeApi, setIsFavorite);
  }

  const infoMeals = (
    <div>
      { doneButtonHide
      && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={
            () => history.push(`/comidas/${id}/in-progress`)
          }
        >
          {' '}
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}

        </button>) }
      <DetailsCard recipe={ recipeApi } type="Meal" />
      <div className="btns-fav-share">
        <button
          className="fav-btn"
          type="button"
          data-testid="favorite-btn"
          onClick={ () => favoriteMeals() }
          src={ isFavoriteIcon(isFavorite) }
        >
          <img src={ isFavoriteIcon(isFavorite) } alt="" />
        </button>
        <button
          className="share-btn"
          type="button"
          data-testid="share-btn"
          value={ `http://localhost:3000/comidas/${id}` }
          onClick={ ({ currentTarget }) => {
            navigator.clipboard.writeText(currentTarget.value);
            setDisplayMessage(true);
          } }
        >
          <img src={ shareIcon } alt="" />
        </button>
      </div>
      {displayMessage && <p className="clip-board">Link copiado!</p>}

    </div>
  );

  return (
    <div>
      {validate && infoMeals}
      <div className="carosel-drink">
        <h2 className="recomendadas">Recomendadas</h2>
        <CarouselMeal />
      </div>
    </div>
  );
}
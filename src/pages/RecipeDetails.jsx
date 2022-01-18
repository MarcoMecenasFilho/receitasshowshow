import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import '../styles/recipeDetails.css';
import { favoriteFood,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { checkLocalStore } from '../service/localStorageFunctions';
import { checkButtonStartMeal } from '../service/StartButtonFunction';
import shareIcon from '../images/iconCompartilhar.png';
import Footer from '../components/Footer';
import CarouselMeal from '../components/CarouselMeal';
import ProfileLink from '../components/ProfileLInk';

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
    <div className="details-div food-background">
      <DetailsCard recipe={ recipeApi } type="Meal" />
      { doneButtonHide
      && (
        <button
          className={ inProgress ? 'continue-btn' : 'start-btn' }
          type="button"
          data-testid="start-recipe-btn"
          onClick={
            () => history.push(`/comidas/${id}/in-progress`)
          }
        >
          {' '}
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}

        </button>) }
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
        <ProfileLink />
      </div>
      {displayMessage && <p className="clip-board">Link copiado!</p>}
      <div className="carousel-food">
        <h2 className="recomendadas">recommended</h2>
        <CarouselMeal />
      </div>
    </div>
  );

  return (
    <div>
      {validate && infoMeals}
      <Footer />
    </div>
  );
}

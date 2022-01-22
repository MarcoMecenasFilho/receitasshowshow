import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DetailsCard from '../components/DetailsCard';
import '../styles/recipeDetails.css';
import { favoriteCockTail,
  isFavoriteIcon, favoriteCheckRecipe } from '../service/favoriteFunctions';
import { checkLocalStore } from '../service/localStorageFunctions';
import { checkButtonStartDrink } from '../service/StartButtonFunction';
import shareIcon from '../images/iconCompartilhar.png';
import CarouselDrink from '../components/CarouselDrink';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';

export default function DrinkDetails() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgress, setInprogress] = useState(false);
  const [doneButtonHide, setDoneButtonHide] = useState(true);
  const history = useHistory();
  const page = history.location.pathname;
  const url = window.location.href;
  const id = page.split('/')[2];

  function inialState() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setRecipeApi(result.drinks[0]);
        return result.drinks[0];
      })
      .then(() => (favoriteCheckRecipe(id, setIsFavorite)))
      .then(() => checkButtonStartDrink(id, setDoneButtonHide, setInprogress))
      .then(() => setValidate(true));
  }

  useEffect(() => {
    checkLocalStore();
    inialState();
    // eslint-disable-next-line
  }, []);

  function favoriteMeals() {
    favoriteCockTail(id, recipeApi, setIsFavorite);
  }

  const infoDrinks = (
    <div className="details-div drink-background">

      <DetailsCard recipe={ recipeApi } type="Drink" />
      { doneButtonHide
      && (
        <button
          className={ inProgress ? 'continue-btn' : 'start-btn' }
          type="button"
          data-testid="start-recipe-btn"
          onClick={
            () => history.push(`/bebidas/${id}/in-progress`)
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
          value={ url }
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
      <div className="carousel-drink">
        <h2 className="recomendadas">recommended</h2>
        <CarouselDrink />
      </div>
    </div>
  );

  return (
    <div>
      {validate && infoDrinks}
      <Footer />
    </div>
  );
}

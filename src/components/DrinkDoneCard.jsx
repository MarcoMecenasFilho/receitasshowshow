import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/recipesMade.css';
import iconrefazer from '../images/iconrefazer.png';

export default function DrinkDoneCard({ recipe, index }) {
  const { image, name, alcoholicOrNot, doneDate, id } = recipe;
  const history = useHistory();

  function remakeRecipe() {
    const recipesInprogress = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: { ...recipesInprogress.cocktails, [id]: [] },
        meals: { ...recipesInprogress.meals } }));

    const recipeMade = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = recipeMade.filter((recipes) => (recipes.id !== id));

    localStorage.setItem('doneRecipes', JSON
      .stringify(filteredRecipes));

    history.push(`bebidas/${id}/in-progress`);
  }

  return (
    <div className="card-recipe-made" key={ index }>
      <Link to={ `/bebidas/${id}` }>
        <div className="card-elements-made">
          <img
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <div className="cards-text-made">
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {` Made in: ${doneDate}`}
            </p>
          </div>
        </div>
      </Link>
      <div className="btns-made">
        <button
          type="button"
          onClick={ remakeRecipe }
        >
          <img src={ iconrefazer } alt="refazer" />
        </button>
      </div>
    </div>
  );
}

DrinkDoneCard.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
};

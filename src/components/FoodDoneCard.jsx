import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/recipesMade.css';
import iconrefazer from '../images/iconrefazer.png';

export default function FoodDoneCard({ recipe, index }) {
  const { image, category, area, name, doneDate, tags, id } = recipe;

  const history = useHistory();
  const splitTags = tags[0].split(',');

  function remakeRecipe() {
    const recipesInprogress = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: { ...recipesInprogress.cocktails },
        meals: { ...recipesInprogress.meals, [id]: [] } }));

    const recipeMade = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = recipeMade.filter((recipes) => (recipes.id !== id));

    localStorage.setItem('doneRecipes', JSON
      .stringify(filteredRecipes));

    history.push(`comidas/${id}/in-progress`);
  }

  return (
    <div className="card-recipe-made" key={ index }>
      <Link to={ `/comidas/${id}` }>
        <div className="card-elements-made">
          <img
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <div className="cards-text-made">
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${area} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {` Feito em: ${doneDate}`}
            </p>
            <section className="tags-container">
              {
                (splitTags !== []) && (
                  splitTags.map((tag, tagIndex) => (
                    tagIndex < 1 && (
                      <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>)))
                )
              }
            </section>
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

FoodDoneCard.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import getFoodIngredients from '../service/getRecipeIngredients';
import '../styles/recipeDetails.css';

export default function DetailsCard({ recipe, type }) {
  return (
    <div className="details-card">
      <div className="div-img">
        <img
          src={ recipe[`str${type}Thumb`] }
          alt=""
          data-testid="recipe-photo"
        />
      </div>
      <h1 data-testid="recipe-title">{ recipe[`str${type}`]}</h1>
      <p
        className="category"
        data-testid="recipe-category"
      >
        {type === 'Drink' ? recipe.strAlcoholic : recipe.strCategory}

      </p>

      <div className="ingredients-div">
        {getFoodIngredients(recipe).map((ingredient, index) => (

          <li
            key={ ingredient.name }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient.name}
            -
            {ingredient.quantity}
          </li>

        ))}
      </div>
      <h2>Instructions</h2>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {recipe.strInstructions}

      </p>

      {
        type === 'Meal' && (
          <div className="wrapper">
            <ReactPlayer
              className="player"
              data-testid="video"
              url={ recipe.strYoutube }
              width="100%"
              height="100%"
            />
          </div>)
      }
    </div>
  );
}

DetailsCard.propTypes = {
  recipe: PropTypes.arrayOf().isRequired,
  type: PropTypes.string.isRequired,
};

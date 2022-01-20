import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/cardComponent.css';

export default function CardRecipes({ results, type }) {
  const MAX_RESULTS = 12;

  const slicedResults = results.slice(0, MAX_RESULTS);

  return (
    <div className="container-recipes">
      {
        slicedResults.map((result, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card-recipe"
          >
            <Link
              to={
                type === 'Meal'
                  ? `/comidas/${result.idMeal}`
                  : `/bebidas/${result.idDrink}`
              }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ result[`str${type}Thumb`] }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>{result[`str${type}`]}</p>
            </Link>
          </div>))
      }
    </div>
  );
}

CardRecipes.propTypes = {
  result: PropTypes.arrayOf().isRequired,
}.isRequired;

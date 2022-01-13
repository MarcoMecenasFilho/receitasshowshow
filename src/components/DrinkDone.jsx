import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

export default function DrinkDoneCard({ recipe, index }) {
  const { image, name, alcoholicOrNot, doneDate, id } = recipe;
  const [displayMessage, setDisplayMessage] = useState(false);

  return (
    <div className="card-recipe" key={ index }>
      <Link to={ `/bebidas/${id}` }>
        <div className="card-elements">
          <img
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <div className="cads-text">
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {` Feito em: ${doneDate}`}
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        value={ `http://localhost:3000/bebidas/${id}` }
        onClick={ ({ currentTarget }) => {
          navigator.clipboard.writeText(currentTarget.value);
          setDisplayMessage(true);
        } }
      >
        <img src={ shareIcon } alt="" data-testid={ `${index}-horizontal-share-btn` } />
      </button>
      {
        displayMessage && <p style={ { margin: '10px' } }>Link copiado!</p>
      }
    </div>
  );
}

DrinkDoneCard.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
};

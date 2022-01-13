import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

export default function FoodDoneCard({ recipe, index }) {
  const { image, category, area, name, doneDate, tags, id } = recipe;
  const [displayMessage, setDisplayMessage] = useState(false);

  return (
    <div className="card-recipe" key={ index }>
      <Link to={ `/comidas/${id}` }>
        <div className="card-elements">
          <img
            src={ image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
          />
          <div className="cads-text">
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${area} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {` Feito em: ${doneDate}`}
            </p>
            <section className="tags-container">
              {
                (tags !== []) && (
                  tags.map((tag, tagIndex) => (
                    tagIndex < 2 && (
                      <p data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>)))
                )
              }
            </section>
          </div>
        </div>
      </Link>
      <button
        type="button"
        value={ `http://localhost:3000/comidas/${id}` }
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

FoodDoneCard.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  index: PropTypes.number.isRequired,
};

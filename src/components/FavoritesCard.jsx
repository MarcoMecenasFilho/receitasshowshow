import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconfavorite from '../images/iconfavorite.png';
import '../styles/favorites.css';

export default function FavoritesCard({ favorite, onclick }) {
  return (
    <div className="cards-container-fav">
      { favorite !== {}
          && favorite.map((recipe, index) => (
            <div key={ index } className="card-recipe-fav">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <div className="card-elements">
                  <img
                    src={ recipe.image }
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <div className="cards-text">
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {
                        recipe.type === 'comida'
                          ? `${recipe.area} - ${recipe.category}`
                          : recipe.alcoholicOrNot
                      }
                    </p>
                    <p>{recipe.name}</p>
                  </div>
                </div>
              </Link>
              <div className="btns-favs">
                <button
                  type="button"
                  onClick={ () => onclick(recipe.id) }
                >
                  <img
                    src={ iconfavorite }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}

FavoritesCard.propTypes = {
  favorite: PropTypes.objectOf().isRequired,
  onclick: PropTypes.func.isRequired,
};

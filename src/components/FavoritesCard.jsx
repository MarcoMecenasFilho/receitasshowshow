import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';
import '../styles/Favorite.css';

// https://stackoverflow.com/questions/29168719/can-you-target-an-elements-parent-element-using-event-target
// https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard

export default function FavoritesCard({ favorites }) {
  const [displayMessage, setDisplayMessage] = useState(false);
  const { setFavorites } = useContext(AppContext);

  function removeFromLocalStorage(id) {
    const recipesSaved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newState = recipesSaved.filter((recipeSaved) => recipeSaved.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    setFavorites(newState);
  }

  return (
    <div>
      { favorites !== {}
          && favorites.map((recipe, index) => (
            <div key={ index } className="card-recipe">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <div className="card-elements">
                  <img
                    src={ recipe.image }
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <div className="cads-text">
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
                <button type="button" onClick={ () => removeFromLocalStorage(recipe.id) }>
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
                <button
                  type="button"
                  value={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
                  onClick={ ({ currentTarget }) => {
                    navigator.clipboard.writeText(currentTarget.value);
                    setDisplayMessage(true);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </div>
            </div>
          ))}
      {
        displayMessage && <p>Link copiado!</p>
      }
    </div>
  );
}

FavoritesCard.propTypes = {
  favorites: PropTypes.objectOf().isRequired,
};

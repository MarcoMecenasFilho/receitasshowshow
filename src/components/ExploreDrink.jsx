import React from 'react';
import { useHistory } from 'react-router-dom';
import iconingredient from '../images/iconingredient.png';
import iconsuprise from '../images/iconsuprise.png';

export default function ExploreDrink() {
  const history = useHistory();

  function fetchUrl() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((results) => results.json())
      .then((result) => result.drinks[0].idDrink)
      .then((id) => history.push(`/bebidas/${id}`));
  }

  return (
    <div className="links-container-food">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        <div className="btn-infos-explore">
          <h2>Ingrediente</h2>
          <img src={ iconingredient } alt="food" />
        </div>
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => fetchUrl() }
      >
        <div className="btn-infos-explore">
          <h2> Me Surpreenda!</h2>
          <img src={ iconsuprise } alt="food" />
        </div>
      </button>
    </div>
  );
}

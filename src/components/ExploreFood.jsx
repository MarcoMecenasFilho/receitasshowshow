import React from 'react';
import { useHistory } from 'react-router-dom';
import iconsuprise from '../images/iconsuprise.png';
import iconlocal from '../images/iconlocal.png';
import iconingredient from '../images/iconingredient.png';

export default function ExploreFood() {
  const history = useHistory();

  function fetchUrl() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((results) => results.json())
      .then((result) => result.meals[0].idMeal)
      .then((id) => history.push(`/comidas/${id}`));
  }
  return (
    <div className="links-container-food">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        <div className="btn-infos-explore">
          <h2>Ingrediente</h2>
          <img src={ iconingredient } alt="food" />
        </div>
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        <div className="btn-infos-explore">
          <h2>Local de Origem</h2>
          <img src={ iconlocal } alt="food" />
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

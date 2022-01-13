import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreFood() {
  const history = useHistory();

  function fetchUrl() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((results) => results.json())
      .then((result) => result.meals[0].idMeal)
      .then((id) => history.push(`/comidas/${id}`));
  }
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => fetchUrl() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

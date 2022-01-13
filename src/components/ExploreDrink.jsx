import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreDrink() {
  const history = useHistory();

  function fetchUrl() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((results) => results.json())
      .then((result) => result.drinks[0].idDrink)
      .then((id) => history.push(`/bebidas/${id}`));
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
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

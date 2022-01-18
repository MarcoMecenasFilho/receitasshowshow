import React, { useEffect, useState } from 'react';

import CardCarousel from './CardCarousel';

export default function CarouselMeal() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);

  function inialState() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((result) => {
        setRecipeApi(result.drinks);
      })
      .then(() => setValidate(true));
  }

  useEffect(() => {
    inialState();
  }, []);

  return (
    validate && (
      <CardCarousel type="Drink" results={ recipeApi } page="carousel" />
    )
  );
}

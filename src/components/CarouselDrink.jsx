import React, { useEffect, useState } from 'react';

import CardCarousel from './CardCarousel';

export default function CarouselDrink() {
  const [recipeApi, setRecipeApi] = useState({});
  const [validate, setValidate] = useState(false);

  function inialState() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((result) => {
        setRecipeApi(result.meals);
      })
      .then(() => setValidate(true));
  }

  useEffect(() => {
    inialState();
  }, []);

  return (
    validate && (
      <CardCarousel type="Meal" results={ recipeApi } page="carousel" />
    )
  );
}

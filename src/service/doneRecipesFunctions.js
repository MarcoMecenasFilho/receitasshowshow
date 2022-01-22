function getDate() {
  const date = new Date();
  const day = date.getDate();
  const month = (date.getMilliseconds() + 1);
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  return fullDate;
}

export default function doneDrink(id, recipeApiState) {
  const { strDrinkThumb, strDrink, strCategory, strAlcoholic } = recipeApiState;
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipe) {
    localStorage.setItem('doneRecipes', JSON
      .stringify([{ id,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: getDate(),
        tags: [],
      }]));
  }
  if (doneRecipe && doneRecipe.some((food) => food.id === id) === false) {
    localStorage.setItem('doneRecipes', JSON
      .stringify([...doneRecipe, { id,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: getDate(),
        tags: [],
      }]));
  }
}

export function doneFood(id, recipeApiState) {
  const { strMeal, strCategory, strArea, strMealThumb, strTags } = recipeApiState;
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

  if (!doneRecipe) {
    localStorage.setItem('doneRecipes', JSON
      .stringify([{ id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: getDate(),
        tags: strTags,
      }]));
  }
  if (doneRecipe && doneRecipe.some((food) => food.id === id) === false) {
    localStorage.setItem('doneRecipes', JSON
      .stringify([...doneRecipe, { id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: getDate(),
        tags: strTags,
      }]));
  }
}

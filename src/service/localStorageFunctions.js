import getRecipeIngredients from './getRecipeIngredients';

export function checkLocalStore() {
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: {}, meals: {} }));
  }
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([]));
  } if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON
      .stringify([]));
  }
}

export function totalSteps(recipe, setTotalIngredientsState) {
  setTotalIngredientsState(getRecipeIngredients(recipe).length);
}

export function checkBoxSteepsDone(id, stepsDoneState, type) {
  const ingredientLocalStore = JSON.parse(localStorage
    .getItem('inProgressRecipes'));
  if (type === 'cocktails' && ingredientLocalStore.cocktails[id]) {
    stepsDoneState(ingredientLocalStore.cocktails[id].length);
  }
  if (type === 'meals' && ingredientLocalStore.meals[id]) {
    stepsDoneState(ingredientLocalStore.meals[id].length);
  }
}

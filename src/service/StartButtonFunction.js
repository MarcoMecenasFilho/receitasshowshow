export function checkButtonStartMeal(id, setButtonDoneState, setInprogressState) {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipe && doneRecipe.some((food) => food.id === id) === true) {
    return setButtonDoneState(false);
  }
  if (recipeInProgress.meals[id]) {
    return setInprogressState(true);
  }
}

export function checkButtonStartDrink(id, setButtonDoneState, setInprogressState) {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipe && doneRecipe.some((food) => food.id === id) === true) {
    return setButtonDoneState(false);
  }
  if (recipeInProgress.cocktails[id]) {
    return setInprogressState(true);
  }
}

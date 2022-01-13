export function clickCocktailsBox({ target }, id, setIncrementState, IncrementState) {
  const ingredientLocalStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals, cocktails } = ingredientLocalStore;
  if (!cocktails[id]) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails: { ...cocktails, [id]: [target.value] }, meals }));
    setIncrementState(IncrementState + 1);
  }
  if (cocktails[id]) {
    const ingredientFiltered = cocktails[id]
      .some((chekedIngredient) => chekedIngredient === target.value);
    console.log(ingredientFiltered);
    if (ingredientFiltered === false) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails:
          { ...cocktails, [id]: [...cocktails[id], target.value] },
        meals }));
      setIncrementState(IncrementState + 1);
    }
    if (ingredientFiltered === true) {
      const filteredDrinks = cocktails[id].filter((drinks) => (
        drinks !== target.value
      ));
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails:
          { [id]: [...filteredDrinks] },
        meals }));
      setIncrementState(IncrementState - 1);
    }
  }
}

export function clickMealBox({ target },
  id, setIncrementState, incrementState) {
  const ingredientLocalStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals, cocktails } = ingredientLocalStore;
  if (!meals[id]) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ cocktails, meals: { ...meals, [id]: [target.value] } }));
    setIncrementState(incrementState + 1);
  }
  if (meals[id]) {
    const ingredientFiltered = meals[id]
      .some((chekedIngredient) => chekedIngredient === target.value);
    console.log(ingredientFiltered);
    if (ingredientFiltered === false) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails,
          meals:
          { ...meals, [id]: [...meals[id], target.value] } }));
      setIncrementState(incrementState + 1);
    } if (ingredientFiltered === true) {
      const filteredMeals = meals[id].filter((meal) => (
        meal !== target.value
      ));
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails, meals: { [id]: [...filteredMeals] } }));
      setIncrementState(incrementState - 1);
    }
  }
}

export function checkedBox(value, id, type) {
  const ingredientLocalStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (type === 'cocktails'
  && ingredientLocalStore.cocktails[id] && ingredientLocalStore.cocktails[id]
    .some((chekedIngredient) => chekedIngredient === value)) {
    return true;
  }
  if (type === 'meals'
    && ingredientLocalStore.meals[id] && ingredientLocalStore.meals[id]
    .some((chekedIngredient) => chekedIngredient === value)) {
    return true;
  }
}

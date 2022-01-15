import iconfavorite from '../images/iconfavorite.png';
import noIconFavorite from '../images/nofavoriteIcon.png';

export function favoriteCockTail(id, recipeApiResponse, setFavoriteState) {
  const { strDrink, strCategory, strDrinkThumb, strAlcoholic } = recipeApiResponse;
  const favoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteDrink.some((cocktail) => cocktail.id === id) === false) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteDrink, { id,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }]));
    setFavoriteState(true);
  }
  if (favoriteDrink.some((cocktail) => cocktail.id === id) === true) {
    const favoriteCocktailFiltered = favoriteDrink
      .filter((drink) => drink.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteCocktailFiltered));
    setFavoriteState(false);
  }
}

export function favoriteCheckRecipe(id, setFavoriteState) {
  const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteRecipe) {
    setFavoriteState(false);
  }

  if (favoriteRecipe.some((recipe) => recipe.id === id) === true) {
    setFavoriteState(true);
  }
  if (favoriteRecipe.some((recipe) => recipe.id === id) === false) {
    setFavoriteState(false);
  }
}

export function favoriteFood(id, recipeApiResponse, setFavoriteState) {
  const { strMeal, strCategory, strArea, strMealThumb } = recipeApiResponse;
  const favoriteMeal = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (favoriteMeal.some((food) => food.id === id) === false) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteMeal, { id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }]));
    setFavoriteState(true);
  }
  if (favoriteMeal.some((food) => food.id === id) === true) {
    const favoriteFoodFiltered = favoriteMeal
      .filter((meal) => meal.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFoodFiltered));
    setFavoriteState(false);
  }
}

export function isFavoriteIcon(favoriteState) {
  if (favoriteState === false) {
    return noIconFavorite;
  }
  if (favoriteState === true) {
    return iconfavorite;
  }
}

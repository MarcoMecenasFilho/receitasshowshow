import React, { useEffect, useState } from 'react';
import DrinkDoneCard from '../components/DrinkDoneCard';
import FoodDoneCard from '../components/FoodDoneCard';
import ProfileLink from '../components/ProfileLInk';
import bannergif from '../images/banner.gif';
import '../styles/recipesMade.css';
import Footer from '../components/Footer';

export default function RecipesMade() {
  const [recipes, setRecipes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filters, setFilters] = useState('');

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <div className="main-div-made">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-made">
          <ProfileLink />
          <h1 data-testid="page-title">Receitas Feitas</h1>
        </div>
      </header>
      <main className="main-recipe">
        <section className="filters-Btns-made">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilters('') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => {
              setFilters('food');
              setFoods(recipes.filter((recipe) => recipe.type === 'comida'));
            } }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => {
              setFilters('drink');
              setDrinks(recipes.filter((recipe) => recipe.type === 'bebida'));
            } }
          >
            Drink
          </button>
        </section>
        <section className="cards-section-made">
          <div className="cards-container-made">
            {
              (recipes && filters === '') && recipes.map((recipe, index) => (
                recipe.type === 'comida'
                  ? <FoodDoneCard key={ index } recipe={ recipe } index={ index } />
                  : <DrinkDoneCard key={ index } recipe={ recipe } index={ index } />
              ))
            }
            {
              (recipes && filters === 'food') && foods.map((recipe, index) => (
                <FoodDoneCard key={ index } recipe={ recipe } index={ index } />))
            }
            {
              (recipes && filters === 'drink') && drinks.map((recipe, index) => (
                <DrinkDoneCard key={ index } recipe={ recipe } index={ index } />))
            }
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

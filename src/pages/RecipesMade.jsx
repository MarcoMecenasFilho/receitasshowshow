import React, { useEffect, useState } from 'react';
import DrinkDoneCard from '../components/DrinkDone';
import FoodDoneCard from '../components/FoodDone';
import ProfileLink from '../components/ProfileLInk';
import '../styles/DoneRecipes.css';

export default function RecipesMade() {
  const [recipes, setRecipes] = useState([]);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filters, setFilters] = useState('');

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <>
      <header>
        <ProfileLink />
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </header>
      <div className="btns">
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
      </div>
      <div className="cards-container">
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
    </>
  );
}

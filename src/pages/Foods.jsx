import React, { useContext, useEffect, useState } from 'react';
import CardRecipes from '../components/CardRecipes';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';
import bannergif from '../images/banner.gif';
import '../styles/recipes.css';

export default function Foods() {
  const { mealResults, setMealsResults } = useContext(AppContext);
  const [mealDefault, setMealDefault] = useState([]);
  const [filters, setFilters] = useState([]);
  const [alreadyFiltered, setAlreadyFiltered] = useState('');
  const isMeals = 'Meal';
  const MAX_FILTERS = 5;

  function fetchByCategory(category) {
    if (alreadyFiltered === category) {
      setAlreadyFiltered('');
      setMealsResults([]);
      return;
    }
    setAlreadyFiltered(category);
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setMealsResults(result.meals);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchFilters() {
    try {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((result) => {
          const slicedResult = result.meals.slice(0, MAX_FILTERS);
          setFilters(slicedResult);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchDefaultMeals() {
    try {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => {
          setMealDefault(result.meals);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDefaultMeals();
    fetchFilters();
  }, []);

  return (
    <div className="main-div-foods">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos">
          <ProfileLink />
          <h1 data-testid="page-title">Comidas</h1>
        </div>
        <SearchBar />
      </header>
      <main>
        <div className="filters-Btns">
          {filters.map((filter, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${filter.strCategory}-category-filter` }
              onClick={ () => fetchByCategory(filter.strCategory) }
            >
              {filter.strCategory}
            </button>
          ))}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setMealsResults([]) }
          >
            All
          </button>
        </div>
        {mealResults && mealResults.length > 0
          ? <CardRecipes results={ mealResults } type={ isMeals } />
          : <CardRecipes results={ mealDefault } type={ isMeals } />}
      </main>
      <Footer />
    </div>
  );
}

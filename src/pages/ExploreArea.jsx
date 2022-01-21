import React, { useEffect, useState, useContext } from 'react';
import ProfileLink from '../components/ProfileLInk';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import CardRecipes from '../components/CardRecipes';
import bannergif from '../images/banner.gif';
import '../styles/explore.css';

export default function ExploreArea() {
  const [filtersByArea, setFiltersByArea] = useState([]);
  const [mealDefault, setMealDefault] = useState([]);
  const { mealResults } = useContext(AppContext);
  const isMeals = 'Meal';

  function fetchAreas() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    try {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setFiltersByArea(result.meals);
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

  function filterBylocal({ value }) {
    if (value === 'All') {
      fetchDefaultMeals();
      return;
    }
    try {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`)
        .then((response) => response.json())
        .then((result) => {
          setMealDefault(result.meals);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAreas();
    fetchDefaultMeals();
  }, []);

  return (
    <div className="main-div-local">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-local">
          <ProfileLink />
          <h1 data-testid="page-title">
            Explorar Origem
          </h1>
        </div>
        <SearchBar />
      </header>
      <select
        onChange={ ({ target }) => filterBylocal(target) }
        data-testid="explore-by-area-dropdown"
        className="select-local"
      >
        {filtersByArea.map((area, index) => (
          <option
            key={ index }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}
          </option>))}
        <option
          data-testid="All-option"
        >
          All
        </option>
      </select>
      {mealResults.length > 0
        ? <CardRecipes results={ mealResults } type={ isMeals } />
        : <CardRecipes results={ mealDefault } type={ isMeals } />}
      <Footer />
    </div>
  );
}

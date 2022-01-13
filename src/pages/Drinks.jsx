import React, { useContext, useState, useEffect } from 'react';
import ProfileLink from '../components/ProfileLInk';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import Card from '../components/Card';
import StyledDiv from '../styles/FoodsAndDrinks';
import StyledHeader from '../styles/Header';

export default function Drinks() {
  const { drinksResults, setDrinksResults } = useContext(AppContext);
  const [drinksDefault, setDrinksDefault] = useState([]);
  const [filters, setFilters] = useState([]);
  const [alreadyFiltered, setAlreadyFiltered] = useState('');
  const isDrink = 'Drink';
  const MAX_FILTERS = 5;

  function fetchByCategory(category) {
    if (alreadyFiltered === category) {
      setAlreadyFiltered('');
      setDrinksResults([]);
      return;
    }
    setAlreadyFiltered(category);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setDrinksResults(result.drinks);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchFilters() {
    try {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((result) => {
          const slicedResult = result.drinks.slice(0, MAX_FILTERS);
          setFilters(slicedResult);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchDefaultDrinks() {
    try {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => {
          setDrinksDefault(result.drinks);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDefaultDrinks();
    fetchFilters();
  }, []);

  return (
    <>
      <StyledHeader>
        <ProfileLink />
        <h1 data-testid="page-title">Bebidas</h1>
        <SearchBar />
      </StyledHeader>
      <StyledDiv>
        <div className="filtersBtns">
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
            onClick={ () => setDrinksResults([]) }
          >
            All
          </button>
        </div>
        {
          drinksResults && drinksResults.length > 0
            ? <Card results={ drinksResults } type={ isDrink } />
            : <Card results={ drinksDefault } type={ isDrink } />
        }
      </StyledDiv>
      <Footer />
    </>);
}

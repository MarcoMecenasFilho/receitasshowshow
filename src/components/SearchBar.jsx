import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';
import '../styles/searchbarComponent.css';

export default function SearchBar() {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [filter, setFilter] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const {
    setMealsResults,
    setDrinksResults,
  } = useContext(AppContext);

  const history = useHistory();
  const page = history.location.pathname;

  function verifyEmptyResult(result) {
    if (!result) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  function fetchUrl(url) {
    try {
      fetch(url)
        .then((results) => results.json())
        .then((result) => {
          if (page === '/comidas') {
            setMealsResults(result.meals);
            verifyEmptyResult(result.meals);
            if (result.meals && result.meals.length === 1) {
              history.push(`/comidas/${result.meals[0].idMeal}`);
            }
          }
          if (page === '/bebidas') {
            setDrinksResults(result.drinks);
            verifyEmptyResult(result.drinks);
            if (result.drinks && result.drinks.length === 1) {
              history.push(`/bebidas/${result.drinks[0].idDrink}`);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  function filterByPage(path, filterInput) {
    if (path === '/comidas') {
      switch (filterInput) {
      case 'ingrediente':
        fetchUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`);
        break;
      case 'nome':
        fetchUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
        break;
      case 'letra':
        fetchUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey}`);
        break;
      default:
        fetchUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`);
        break;
      }
    }
    if (path === '/bebidas') {
      switch (filterInput) {
      case 'ingrediente':
        fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchKey}`);
        break;
      case 'nome':
        fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchKey}`);
        break;
      case 'letra':
        fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchKey}`);
        break;
      default:
        fetchUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchKey}`);
        break;
      }
    }
  }

  const toggleSearchDisplay = () => (
    searchDisplay ? setSearchDisplay(false) : setSearchDisplay(true)
  );

  function handleClick() {
    if (filter === 'letra' && searchKey.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      filterByPage(page, filter);
      setSearchDisplay(false);
    }
  }

  return (
    <div className="container">
      <button
        type="button"
        onClick={ toggleSearchDisplay }
        data-testid="search-top-btn"
        src={ searchIcon }
        className="btn-search"
      >
        Pesquisar
      </button>
      {searchDisplay
      && (
        <form>
          <button
            type="button"
            className="exit-btn"
            onClick={ () => setSearchDisplay(false) }
          >
            x
          </button>
          <label htmlFor="ingredient">
            Ingrediente
            <input
              id="ingredient"
              type="radio"
              name="filter"
              value="ingrediente"
              data-testid="ingredient-search-radio"
              onClick={ ({ target }) => setFilter(target.value) }
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="radio"
              name="filter"
              value="nome"
              data-testid="name-search-radio"
              onClick={ ({ target }) => setFilter(target.value) }
            />
          </label>
          <label htmlFor="letter">
            Primeira Letra
            <input
              id="letter"
              type="radio"
              name="filter"
              value="letra"
              data-testid="first-letter-search-radio"
              onClick={ ({ target }) => setFilter(target.value) }
            />
          </label>
          <label htmlFor="search">
            Pesquisa
            <input
              id="search"
              type="text"
              name="search"
              data-testid="search-input"
              onChange={ ({ target }) => setSearchKey(target.value) }
            />
          </label>
          <button
            id="search"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
            className="btn-search"
          >
            Buscar
          </button>
        </form>
      )}
    </div>
  );
}

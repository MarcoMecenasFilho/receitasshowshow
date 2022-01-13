import React, { useState, useContext } from 'react';
import ProfileLink from '../components/ProfileLInk';
import FavoritesCard from '../components/FavoritesCard';
import AppContext from '../context/AppContext';
import '../styles/Favorite.css';

export default function Favorites() {
  const [filters, setFilters] = useState('');
  const { favorites } = useContext(AppContext);
  return (
    <>
      <header>
        <ProfileLink />
        <h1 data-testid="page-title">
          Receitas Favoritas
        </h1>
      </header>
      <div className="favorites-main">
        <section className="btns">
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
            onClick={ () => setFilters('food') }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilters('drink') }
          >
            Drinks
          </button>
        </section>
        <section className="cards-container">
          {
            (favorites && filters === '') && <FavoritesCard favorites={ favorites } />
          }
          {
            (favorites && filters === 'food') && (
              <FavoritesCard
                favorites={ favorites.filter((fav) => fav.type === 'comida') }
              />
            )
          }
          {
            (favorites && filters === 'drink') && (
              <FavoritesCard
                favorites={ favorites.filter((fav) => fav.type === 'bebida') }
              />
            )
          }
        </section>
      </div>
    </>
  );
}

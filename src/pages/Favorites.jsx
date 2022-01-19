import React, { useEffect, useState } from 'react';
import ProfileLink from '../components/ProfileLInk';
import FavoritesCard from '../components/FavoritesCard';
import bannergif from '../images/banner.gif';
import '../styles/favorites.css';

export default function Favorites() {
  const [filters, setFilters] = useState('');
  const [favorites, setFavorites] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <div className="main-div-fav">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-fav">
          <ProfileLink />
          <h1 data-testid="page-title">
            Receitas Favoritas
          </h1>
        </div>
      </header>
      <main>
        <section className="filters-Btns-fav">
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
        <section className="cards-section">
          {
            (favorites && filters === '') && <FavoritesCard favorite={ favorites } />
          }
          {
            (favorites && filters === 'food') && (
              <FavoritesCard
                favorite={ favorites.filter((fav) => fav.type === 'comida') }
              />
            )
          }
          {
            (favorites && filters === 'drink') && (
              <FavoritesCard
                favorite={ favorites.filter((fav) => fav.type === 'bebida') }
              />
            )
          }
        </section>
      </main>
    </div>
  );
}

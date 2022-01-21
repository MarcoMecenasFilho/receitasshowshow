import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import bannergif from '../images/banner.gif';
import iconexplorefood from '../images/iconexplorefood.png';
import iconexploredrink from '../images/iconexploredrink.png';
import '../styles/explore.css';

export default function Explore() {
  const history = useHistory();

  return (
    <div className="main-div-explore">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-explore">
          <ProfileLink />
          <h1 data-testid="page-title">Explorar</h1>
        </div>
      </header>
      <div className="links-container">
        <button
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
          data-testid="explore-food"
        >
          <div className="btn-infos-explore">
            <h2>Explorar comida</h2>
            <img src={ iconexplorefood } alt="food" />
          </div>
        </button>
        <button
          onClick={ () => history.push('/explorar/bebidas') }
          type="button"
          data-testid="explore-drinks"
        >
          <div className="btn-infos-explore">
            <h2>Explorar bebida</h2>
            <img src={ iconexploredrink } alt="drink" />
          </div>
        </button>
      </div>
      <Footer />
    </div>
  );
}

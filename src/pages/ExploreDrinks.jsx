import React from 'react';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import ExploreDrink from '../components/ExploreDrink';
import '../styles/explore.css';
import bannergif from '../images/banner.gif';

export default function ExploreDrinks() {
  return (
    <div className="main-div-explore">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-explore">
          <ProfileLink />
          <h1 data-testid="page-title">Explorar Bebidas</h1>
        </div>
      </header>
      <ExploreDrink />
      <Footer />
    </div>
  );
}

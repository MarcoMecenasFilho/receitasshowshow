import React from 'react';
import ExploreFood from '../components/ExploreFood';
import Footer from '../components/Footer';
import bannergif from '../images/banner.gif';
import ProfileLink from '../components/ProfileLInk';
import '../styles/explore.css';

export default function ExploreFoods() {
  return (
    <div className="main-div-explore backfood">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-explore">
          <ProfileLink />
          <h1 data-testid="page-title">Explorar Comidas</h1>
        </div>
      </header>
      <ExploreFood />
      <Footer />
    </div>
  );
}

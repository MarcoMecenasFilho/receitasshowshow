import React from 'react';
import ExploreFood from '../components/ExploreFood';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';

export default function ExploreFoods() {
  return (
    <>
      <header>
        <ProfileLink />
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </header>
      <ExploreFood />
      <Footer />
    </>
  );
}

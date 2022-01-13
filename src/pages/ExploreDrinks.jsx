import React from 'react';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import ExploreDrink from '../components/ExploreDrink';

export default function ExploreDrinks() {
  return (
    <>
      <header>
        <ProfileLink />
        <h1 data-testid="page-title">Explorar Bebidas</h1>
      </header>
      <ExploreDrink />
      <Footer />
    </>
  );
}

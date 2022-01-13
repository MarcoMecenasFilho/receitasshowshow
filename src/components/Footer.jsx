import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import StyledFooter from '../styles/Footer';

export default function Footer() {
  return (
    <StyledFooter data-testid="footer" className="footer">
      <Link src={ drinkIcon } to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drinks logo" />
      </Link>
      <Link src={ exploreIcon } to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore icon" />
      </Link>
      <Link src={ mealIcon } to="comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="meal icon" />
      </Link>
    </StyledFooter>
  );
}

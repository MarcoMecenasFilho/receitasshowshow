import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/icondrinks.png';
import exploreIcon from '../images/iconexplore.png';
import mealIcon from '../images/iconfood.png';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link src={ drinkIcon } to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drinks logo" />
      </Link>
      <Link src={ exploreIcon } to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore icon" />
      </Link>
      <Link src={ mealIcon } to="comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="meal icon" />
      </Link>
    </footer>
  );
}

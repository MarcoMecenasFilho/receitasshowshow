import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/drinkDetails.css';

export default function CardCarousel({ results, type }) {
  const carousel = 6;

  const slicedResults = results.slice(0, carousel);

  return (
    <div className="card-carousel">
      <Carousel variant="dark" className="carousel">
        {slicedResults.map((recipes, index) => (
          <Carousel.Item
            key={ type === 'Meal'
              ? `${recipes.idMeal}`
              : `${recipes.idDrink}` }
          >
            <div
              data-testid={ `${index}-recomendation-card` }
              className="carousel-items"
            >
              <Link
                to={
                  type === 'Meal'
                    ? `/comidas/${recipes.idMeal}`
                    : `/bebidas/${recipes.idDrink}`
                }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipes[`str${type}Thumb`] }
                  alt=""
                  style={ { width: '200px' } }
                />
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {recipes[`str${type}`]}

                </p>
              </Link>
            </div>
          </Carousel.Item>

        ))}
      </Carousel>
    </div>
  );
}

CardCarousel.propTypes = {
  result: PropTypes.arrayOf().isRequired,
}.isRequired;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/recipeDetails.css';

export default function CardCarousel({ results, type }) {
  return (
    <div className="card-carousel">
      <Carousel variant="dark" className="carousel">
        {results.map((recipes, index) => (
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
                className="link-carousel"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipes[`str${type}Thumb`] }
                  alt=""
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

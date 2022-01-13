import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import StyledDiv from '../styles/Profile';
import StyledHeader from '../styles/Header';

export default function Profile({ history }) {
  function historyPush(page) {
    history.push(page);
  }

  function exitButton() {
    localStorage.clear();
    history.push('/');
  }

  const email = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <StyledHeader>
        <ProfileLink />
        <h1 data-testid="page-title">Perfil</h1>
      </StyledHeader>
      <StyledDiv>
        { email
          ? <h2 data-testid="profile-email">{email.email}</h2>
          : <h2 data-testid="profile-email"> </h2> }
        <Button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => historyPush('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>
        <Button
          type="button"
          onClick={ () => historyPush('/receitas-favoritas') }
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
        <Button
          type="button"
          onClick={ exitButton }
          data-testid="profile-logout-btn"
        >
          Sair
        </Button>
      </StyledDiv>

      <Footer />
    </div>

  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

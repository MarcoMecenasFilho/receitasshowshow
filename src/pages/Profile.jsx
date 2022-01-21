import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import ProfileLink from '../components/ProfileLInk';
import bannergif from '../images/banner.gif';
import '../styles/profile.css';

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
    <div className="main-div-profile">
      <img src={ bannergif } alt="banner gif" />
      <header>
        <div className="user-infos-profile">
          <ProfileLink />
          { email
            ? <h1 data-testid="profile-email">{email.email}</h1>
            : <h1 data-testid="profile-email"> </h1> }
        </div>
      </header>
      <div className="links-container-profile">
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
          onClick={ () => historyPush('/editperfil') }
          data-testid="profile-edit-btn"
        >
          Editar Perfil
        </Button>
        <Button
          type="button"
          onClick={ exitButton }
          data-testid="profile-logout-btn"
        >
          Sair
        </Button>
      </div>
      <Footer />
    </div>

  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

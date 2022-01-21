import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profile.png';

export default function ProfileLink() {
  const infos = JSON.parse(localStorage.getItem('user'));

  return (
    <Link to="/perfil" data-testid="profile-top-btn">
      {infos.picture && infos.picture !== '' ? <img
        src={ infos.picture }
        alt="Profile icon"
        style={ { borderRadius: '100px' } }
      />
        : <img src={ profile } alt="Profile icon" />}

    </Link>
  );
}

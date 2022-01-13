import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function ProfileLink() {
  return (
    <Link to="/perfil" src={ profileIcon } data-testid="profile-top-btn">
      <img src={ profileIcon } alt="Profile icon" />
    </Link>
  );
}

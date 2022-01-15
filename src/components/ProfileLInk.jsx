import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profile.png';

export default function ProfileLink() {
  return (
    <Link to="/perfil" src={ profile } data-testid="profile-top-btn">
      <img src={ profile } alt="Profile icon" />
    </Link>
  );
}

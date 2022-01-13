import React from 'react';
import '../styles/NotFound.css';
import { useHistory } from 'react-router-dom';
import snorlax from '../images/snorlax.gif';

export default function NotFound() {
  const history = useHistory();

  return (
    <main className="main-container">
      <h1>Página de receita não encontrada !</h1>
      <img src={ snorlax } alt="snorlax" />
      <button
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        Voltar a página inicial
      </button>
    </main>
  );
}

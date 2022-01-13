import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import StyledDiv from '../styles/Login';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  const validateEmail = (validEmail) => {
    const regex = /[\w]+@[\w]+.com/i;
    if (regex.test(validEmail)) {
      return true;
    }
    return false;
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const PASSWORD_LENGTH = 6;
  return (
    <StyledDiv>
      <h1>Login</h1>
      <Form onSubmit={ handleClick }>
        <Form.Control
          data-testid="email-input"
          onChange={ handleEmail }
          value={ email }
          placeholder="Email"
        />
        <Form.Control
          data-testid="password-input"
          onChange={ handlePassword }
          value={ password }
          type="password"
          placeholder="Senha"
        />
        <Button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(password.length > PASSWORD_LENGTH && validateEmail(email)) }
          variant="flat"
        >
          Entrar
        </Button>
      </Form>
    </StyledDiv>);
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

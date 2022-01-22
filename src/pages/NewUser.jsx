import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import banner from '../images/logo.gif';
import '../styles/login.css';

export default function NewUser({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function newUser(e) {
    e.preventDefault();
    const userLogin = { email, password };
    localStorage.setItem('user', JSON.stringify(userLogin));
    history.push('/');
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

    <div className="div-login">
      <img src={ banner } alt="banner" />
      <Card className="login-card">
        <Form onSubmit={ (e) => newUser(e) } className="form-login">
          <h1>Novo Usuário:</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-2"
            >
              <Form.Control
                type="email"
                name="email"
                onChange={ handleEmail }
                placeholder="Email"
                required
                data-testid="email-input"
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              Nunca compartilhe seus dados de login.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control
                type="password"
                name="password"
                onChange={ handlePassword }
                placeholder="Senha"
                minLength="6"
                required
                data-testid="password-input"
              />
            </FloatingLabel>
          </Form.Group>
          <div className="button-login">
            <Button
              variant="primary"
              type="submit"
              disabled={
                !(password.length > PASSWORD_LENGTH && validateEmail(email))
              }
              data-testid="login-btn"
            >
              Criar Usuário
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

NewUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

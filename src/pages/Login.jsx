import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import banner from '../images/logo.gif';
import '../styles/login.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({
        email: 'admin@admin.com',
        password: 'lolzinho' }));
    }
  }, []);

  function submitUser(e) {
    e.preventDefault();
    const userLocalStore = JSON.parse(localStorage.getItem('user'));
    if (email === userLocalStore.email && password === userLocalStore.password) {
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      history.push('/comidas');
    } else {
      alert('email e/ou senha incorretos, caso tenha esquecido. Cadastrar novo usuário');
    }
  }

  function newUser() {
    history.push('/newuser');
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
        <Form onSubmit={ (e) => submitUser(e) } className="form-login">
          <h1>Login:</h1>
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
              Entrar
            </Button>
            <Button
              variant="warning"
              type="button"
              data-testid="newuser-btn"
              onClick={ newUser }
            >
              Novo Usuário
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

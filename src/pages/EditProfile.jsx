import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import banner from '../images/logo.gif';
import '../styles/editprofile.css';

export default function EditProfile({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');

  function saveProfile(e) {
    e.preventDefault();
    const userLogin = { email, password, picture };
    localStorage.setItem('user', JSON.stringify(userLogin));
    history.push('/perfil');
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

  const handlePicture = (event) => {
    setPicture(event.target.value);
  };

  const PASSWORD_LENGTH = 6;

  return (

    <div className="div-edit">
      <img src={ banner } alt="banner" />
      <Card className="edit-card">
        <Form onSubmit={ (e) => saveProfile(e) } className="form-edit">
          <h1>Editar perfil:</h1>
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
          <Form.Group className="mb-3" controlId="formBasicPicture">
            <FloatingLabel controlId="floatingPassword" label="Url da imagem">
              <Form.Control
                type="text"
                name="picture"
                onChange={ handlePicture }
                placeholder="Url da imagem"
                required
                data-testid="picture-input"
              />
            </FloatingLabel>
          </Form.Group>
          <div className="button-edit">
            <Button
              variant="primary"
              type="submit"
              disabled={
                !(password.length > PASSWORD_LENGTH && validateEmail(email))
              }
              data-testid="login-btn"
            >
              Salvar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

EditProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

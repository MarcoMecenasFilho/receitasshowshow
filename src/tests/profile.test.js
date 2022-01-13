import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Profile from '../pages/Profile';
import App from '../App';

beforeEach(() => {
  localStorage.setItem('user', '{ "email": "user@user.com" }');
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
});

afterEach(() => {
  localStorage.clear();
});

describe(`82 - Implemente os elementos da a tela de perfil respeitando os atributos 
          descritos no protótipo`, () => {
  test('O elemento de email deve possuir o atributo data-testid="profile-email"', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  test(`O botão com as "Receitas Feitas" deve possuir o atributo 
        data-testid="profile-done-btn"`, () => {
    renderWithRouter(<Profile />);
    const btnProfileDone = screen.getByTestId('profile-done-btn');
    expect(btnProfileDone).toBeInTheDocument();
  });

  test(`O botão com as "Receitas Favoritas" deve possuir o atributo
        data-testid="profile-favorite-btn"`, () => {
    renderWithRouter(<Profile />);
    const btnProfileFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnProfileFavorite).toBeInTheDocument();
  });

  test('O botão de sair deve possuir o atributo data-testid="profile-logout-btn"', () => {
    renderWithRouter(<Profile />);
    const btnProfileLogout = screen.getByTestId('profile-logout-btn');
    expect(btnProfileLogout).toBeInTheDocument();
  });
});

describe(`83 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar
          visível`, () => {
  test('O e-mail armazenado em localStorage está visível', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByText('user@user.com');
    expect(email).toBeInTheDocument();
  });
});

describe(`84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas 
          Favoritas" e um de nome "Sair"`, () => {
  test('A tela contêm todos os 3 botões', () => {
    renderWithRouter(<Profile />);
    const btnsNumber = 3;
    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(btnsNumber);
  });

  test('Existe botão com o nome "Receitas Feitas"', () => {
    renderWithRouter(<Profile />);
    const btnDone = screen.getByText(/Receitas Feitas/i);
    expect(btnDone).toBeInTheDocument();
  });

  test('Existe botão com o nome "Receitas Favoritas"', () => {
    renderWithRouter(<Profile />);
    const btnFavorite = screen.getByText(/Receitas Favoritas/i);
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Testa se existe botão com o nome "Sair', () => {
    renderWithRouter(<Profile />);
    const btnLogout = screen.getByText(/Sair/i);
    expect(btnLogout).toBeInTheDocument();
  });
});

describe(`85 - Redirecione a pessoa usuária que, ao clicar no botão de 
        "Receitas Favoritas", a rota deve mudar para a tela de receitas 
        favoritas`, () => {
  test('Clicar no botão redireciona para "/receita-favotiras"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');

    const btnProfileFavorite = screen.getByTestId('profile-favorite-btn');

    userEvent.click(btnProfileFavorite);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });
});

describe(`86 - Redirecione a pessoa usuária que, ao clicar no 
          botão de "Receitas Feitas", a rota deve mudar para a 
          tela de receitas feitas`, () => {
  test('Clicar no botão redireciona para "/receita-feitas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');

    const btnProfileDone = screen.getByTestId('profile-done-btn');

    userEvent.click(btnProfileDone);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});

describe(`87 - Redirecione a pessoa usuária que, ao clicar no botão de 
          "Sair", o localStorage deve ser limpo e a rota deve mudar 
          para a tela de login`, () => {
  test('Clicar no botão redireciona para "/login" e limpa localStore', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');

    const btnLogout = screen.getByTestId('profile-logout-btn');

    userEvent.click(btnLogout);
    expect(localStorage.getItem('user')).toBe(null);
    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);
    expect(localStorage.getItem('doneRecipes')).toBe(null);
    expect(localStorage.getItem('favoriteRecipes')).toBe(null);
    expect(localStorage.getItem('inProgressRecipes')).toBe(null);

    expect(history.location.pathname).toBe('/');
  });
});

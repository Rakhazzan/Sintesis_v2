import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders login page when not authenticated', () => {
    render(<App />);
    const loginTitle = screen.getByText(/iniciar sesión/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('renders registration link', () => {
    render(<App />);
    const registerLink = screen.getByText(/regístrate/i);
    expect(registerLink).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Bushin Dojo home page', () => {
  render(<App />);
  expect(screen.getByText('Bushin Dojo')).toBeInTheDocument();
});

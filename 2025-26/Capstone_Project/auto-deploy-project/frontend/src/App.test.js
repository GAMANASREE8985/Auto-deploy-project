import { render, screen } from '@testing-library/react';
import App from './App';
// src/setupTests.js
import '@testing-library/jest-dom';

test('renders header', () => {
  render(<App />);
  expect(screen.getByText(/Auto Deploy App/i)).toBeInTheDocument();
});

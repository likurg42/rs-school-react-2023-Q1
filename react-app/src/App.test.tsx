import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import { App } from './App';

it('should have start application', () => {
  window.history.pushState({}, '', import.meta.env.BASE_URL);
  render(<App />);
  const titleOnScreen = screen.queryByText(/Top G's/i);
  expect(titleOnScreen).toBeVisible();
});

it('should render about page', () => {
  window.history.pushState({}, '', `${import.meta.env.BASE_URL}about`);
  render(<App />);
  const myName = screen.queryByText(/@likurg42/i);
  expect(myName).toBeVisible();
});

it('should render not found page', () => {
  window.history.pushState({}, '', `${import.meta.env.BASE_URL}some`);
  render(<App />);
  const myName = screen.queryByText(/There is nothing here.../i);
  expect(myName).toBeVisible();
});

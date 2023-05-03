import { screen } from '@testing-library/react';
import { it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { renderWithProviders } from './test/utils/renderWithProviders';

it('should have start application', () => {
  window.history.pushState({}, '', import.meta.env.BASE_URL);
  renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const titleOnScreen = screen.queryByText(/Top G's/i);
  expect(titleOnScreen).toBeVisible();
});

it('should render about page', () => {
  window.history.pushState({}, '', `${import.meta.env.BASE_URL}about`);
  renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const myName = screen.queryByText(/@likurg42/i);
  expect(myName).toBeVisible();
});

it('should render not found page', () => {
  window.history.pushState({}, '', `${import.meta.env.BASE_URL}some`);
  renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const myName = screen.queryByText(/There is nothing here.../i);
  expect(myName).toBeVisible();
});

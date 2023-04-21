import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider as ReduxProvider } from 'react-redux';
import { ProfilesPage } from './ProfilesPage';
import { store } from '../../store';

describe('profile page', () => {
  it('should not submit', () => {
    render(
      <ReduxProvider store={store}>
        <ProfilesPage />
      </ReduxProvider>
    );

    const newProfile = screen.queryByText(/New Profile/i);
    expect(newProfile).toBeVisible();
  });
});

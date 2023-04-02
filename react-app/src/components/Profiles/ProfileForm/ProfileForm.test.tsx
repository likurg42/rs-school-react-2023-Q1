import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import ProfileForm from './ProfileForm';

describe('profile form', () => {
  it('should not submit', () => {
    render(<ProfileForm />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const nameNotEmpty = screen.queryByText(/Name must not be empty/i);
    expect(nameNotEmpty).toBeVisible();
  });
});

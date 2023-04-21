/* eslint-disable no-return-await */
import {
  fireEvent, screen, waitFor,
} from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Profiles } from './Profiles';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('profiles', () => {
  global.URL.createObjectURL = vi.fn();

  it('should render empty list', () => {
    renderWithProviders(<Profiles />);

    const noProfiles = screen.queryByText(/No Profiles/i);
    expect(noProfiles).toBeVisible();
  });

  it('should add profile', async () => {
    renderWithProviders(<Profiles />);

    fireEvent.input(screen.getByRole('textbox', { name: /Name/i }), {
      target: { value: 'Name' },
    });

    fireEvent.input(screen.getByLabelText(/Birth Date/i), {
      target: { value: '1995-01-01' },
    });

    fireEvent.change(screen.getByRole('combobox', { name: /Primary Language/i }), {
      target: { value: 'PHP' },
    });

    fireEvent.click(screen.getByRole('checkbox', { name: /Contributing to open source/i }));

    fireEvent.click(screen.getByRole('radio', { name: /Senior/i }));

    fireEvent.input(screen.getByRole('textbox', { name: /Github page/i }), {
      target: { value: 'https://github.com/' },
    });

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Upload avatar'), file);

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('');
    expect(screen.getByLabelText(/Birth Date/i)).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /Github page/i })).toHaveValue('');

    expect(screen.getByText(/PHP Open source Senior developer/i)).toBeVisible();
  });
});

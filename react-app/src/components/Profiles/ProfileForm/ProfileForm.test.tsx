import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ProfileForm } from './ProfileForm';

const mockSubmit = vi.fn((name) => Promise.resolve({ name }));

describe('profile form', () => {
  it('should display required failure when valid is invalid', async () => {
    render(<ProfileForm submit={mockSubmit} />);
    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(5);
    expect(mockSubmit).not.toBeCalled();
  });
  it('should display matching error when value is invalid', async () => {
    render(<ProfileForm submit={mockSubmit} />);

    fireEvent.input(screen.getByRole('textbox', { name: /Name/i }), {
      target: { value: 'test' },
    });

    fireEvent.input(screen.getByLabelText(/Birth Date/i), {
      target: { value: '2012-01-01' },
    });

    fireEvent.input(screen.getByRole('combobox', { name: /Primary Language/i }), {
      target: { value: 'Javascript' },
    });

    fireEvent.click(screen.getByRole('checkbox', { name: /Contributing to open source/i }));

    fireEvent.click(screen.getByRole('radio', { name: /Junior/i }));

    fireEvent.input(screen.getByRole('textbox', { name: /Github page/i }), {
      target: { value: 'localhost' },
    });

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Upload avatar'), file);

    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockSubmit).not.toBeCalled();

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('test');
    expect(screen.getByLabelText(/Birth Date/i)).toHaveValue('2012-01-01');
    expect(screen.getByRole('textbox', { name: /Github page/i })).toHaveValue('localhost');
  });
});

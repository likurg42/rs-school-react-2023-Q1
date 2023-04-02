import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Profiles from './Profiles';

const setup = () => {
  const utils = render(<Profiles />);
  const name = screen.getByLabelText('Name') as HTMLInputElement;
  const birthDate = screen.getByLabelText('Birth Date') as HTMLInputElement;
  const favouriteLanguage = screen.getByLabelText('Favourite Language') as HTMLInputElement;
  const experience = screen.getByLabelText('Junior') as HTMLInputElement;
  const avatar = screen.getByLabelText('Upload avatar') as HTMLInputElement;
  const githubUrl = screen.getByLabelText('Github page') as HTMLInputElement;
  const submitBtn = screen.getByRole('button');
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });

  global.URL.createObjectURL = () => 'test url';

  return {
    name,
    birthDate,
    favouriteLanguage,
    experience,
    avatar,
    submitBtn,
    file,
    githubUrl,
    ...utils,
  };
};

describe('profiles', () => {
  it('should render empty list', () => {
    render(<Profiles />);
    const noProfiles = screen.queryByText(/No Profiles/i);
    expect(noProfiles).toBeVisible();
  });

  it('should add profile', async () => {
    const {
      name, birthDate, experience, avatar, submitBtn, file, githubUrl,
    } = setup();
    fireEvent.change(name, { target: { value: 'John Smitt' } });
    expect(name.value).toBe('John Smitt');

    fireEvent.change(birthDate, { target: { value: '1995-01-01' } });
    fireEvent.change(experience, { target: { checked: true } });
    fireEvent.change(githubUrl, { target: { value: 'https://github.com' } });
    fireEvent.click(submitBtn);

    await userEvent.upload(avatar, file);

    expect(avatar.files![0]).toStrictEqual(file);
    expect(avatar.files!.item(0)).toStrictEqual(file);
    expect(avatar.files).toHaveLength(1);

    fireEvent.click(submitBtn);

    expect(name.value).toBe('');

    const description = screen.queryByText(/Javascript Junior developer/i);
    expect(description).toBeVisible();
  });
});

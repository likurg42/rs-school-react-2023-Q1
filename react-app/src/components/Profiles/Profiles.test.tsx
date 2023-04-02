import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Profiles } from './Profiles';

const setup = () => {
  const utils = render(<Profiles />);
  const name = screen.getByLabelText('Name') as HTMLInputElement;
  const birthDate = screen.getByLabelText('Birth Date') as HTMLInputElement;
  const favouriteLanguage = screen.getByLabelText('Primary Language') as HTMLInputElement;
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
      name, birthDate, experience, avatar, file, githubUrl,
    } = setup();
    fireEvent.change(name, { target: { value: 'john Smith' } });
    expect(name.value).toBe('john Smith');

    fireEvent.change(birthDate, { target: { value: '1995-01-01' } });
    fireEvent.change(experience, { target: { checked: true } });
    fireEvent.change(githubUrl, { target: { value: 'https://github.com' } });

    await userEvent.upload(avatar, file);

    expect(avatar.files![0]).toStrictEqual(file);
    expect(avatar.files!.item(0)).toStrictEqual(file);
    expect(avatar.files).toHaveLength(1);

    fireEvent.submit(screen.getByTestId('form'));

    const nameError = screen.queryByText(/Name is required/i);
    expect(nameError).toBeNull();

    const nameCapitalError = screen.queryByText(/Name should start with capital/i);
    expect(nameCapitalError).toBeNull();

    const avatarError = screen.queryByText(/Avatar url is required/i);
    expect(avatarError).toBeNull();

    const githubError = screen.queryByText(/Github url is required/i);
    expect(githubError).toBeNull();

    const experienceError = screen.queryByText(/Experience is required/i);
    expect(experienceError).toBeNull();

    const yearsError = screen.queryByText(/User must be at least 18 years old/i);
    expect(yearsError).toBeNull();

    // const description = screen.queryByText(/John Smith/i);

    // expect(description).toBeVisible();
  });
});

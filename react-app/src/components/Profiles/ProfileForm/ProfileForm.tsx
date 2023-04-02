import React, { createRef, FormEvent } from 'react';
import clsx from 'clsx';
import { isAgeUnder18, isValidUrl, startsWithCapital } from '../../../utils/validation';
import { ProfileFormModel } from '../../../types/profileForm.model';

interface Props {
  submit?: (profileFormValues: ProfileFormModel) => void;
}

interface State {
  errors: {
    name: string;
    birthDate: string;
    experience: string;
    githubUrl: string;
    avatarUrl: string;
  };
  isCreated: boolean;
}

export default class ProfileForm extends React.Component<Props, State> {
  readonly formRef = createRef<HTMLFormElement>();

  readonly nameRef = createRef<HTMLInputElement>();

  readonly birthDateRef = createRef<HTMLInputElement>();

  readonly primaryLanguageRef = createRef<HTMLSelectElement>();

  readonly opensourceRef = createRef<HTMLInputElement>();

  readonly experienceJuniorRef = createRef<HTMLInputElement>();

  readonly experienceMiddleRef = createRef<HTMLInputElement>();

  readonly experienceSeniorRef = createRef<HTMLInputElement>();

  readonly avatarUrlRef = createRef<HTMLInputElement>();

  readonly githubUrlRef = createRef<HTMLInputElement>();

  static defaultProps = {
    submit: () => null,
  };

  readonly initialErrors = {
    name: '',
    birthDate: '',
    experience: '',
    avatarUrl: '',
    githubUrl: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      errors: { ...this.initialErrors },
      isCreated: false,
    };

    /* Binds */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAddedMark = this.showAddedMark.bind(this);
  }

  componentDidUpdate() {
    const { isCreated } = this.state;
    if (isCreated) {
      setTimeout(() => {
        this.setState((state) => ({ ...state, isCreated: false }));
      }, 3000);
    }
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      submit = () => null,
    } = this.props;
    const currentExperienceRef = [
      this.experienceJuniorRef,
      this.experienceMiddleRef,
      this.experienceSeniorRef,
    ].find((el) => el.current!.checked);
    const { files } = this.avatarUrlRef.current!;

    const name = this.nameRef.current!.value;
    const birthDate = this.birthDateRef.current!.value;
    const primaryLanguage = this.primaryLanguageRef.current!.value;
    const opensource = this.opensourceRef.current!.checked;
    const experience = currentExperienceRef ? currentExperienceRef.current!.value : '';
    const avatarUrl = files && files[0] ? URL.createObjectURL(files[0]) : '';
    const githubUrl = this.githubUrlRef.current!.value;

    const profileFormValues: ProfileFormModel = {
      name,
      birthDate,
      primaryLanguage,
      opensource,
      experience,
      avatarUrl,
      githubUrl,
    };

    const isValidated = this.validateForm(profileFormValues);

    if (isValidated && submit) {
      this.showAddedMark();
      this.formRef.current!.reset();
      submit(profileFormValues);
    }
  }

  showAddedMark() {
    this.setState((state) => ({
      ...state,
      isCreated: true,
    }));
  }

  validateForm(profileFormValues: ProfileFormModel): boolean {
    const {
      name, birthDate, experience, githubUrl, avatarUrl,
    } = profileFormValues;

    const errors = { ...this.initialErrors };

    if (name === '') {
      errors.name = 'Name must not be empty';
    }

    if (name !== '' && !startsWithCapital(name)) {
      errors.name = 'Name must start with capital letter';
    }

    if (birthDate === '') {
      errors.birthDate = 'Date must not be empty';
    }

    if (isAgeUnder18(birthDate)) {
      errors.birthDate = 'User must be at least 18 years old';
    }

    if (experience === '') {
      errors.experience = 'Experience must be selected';
    }

    if (avatarUrl === '') {
      errors.avatarUrl = 'Avatar is required';
    }

    if (githubUrl === '') {
      errors.githubUrl = 'Github link must be provided';
    }

    if (!isValidUrl(githubUrl)) {
      errors.githubUrl = 'Link must be valid';
    }

    this.setState((state) => ({ ...state, errors: { ...errors } }));

    return Object.values(errors).every((item) => item === '');
  }

  render() {
    const { errors, isCreated } = this.state;
    return (
      <form
        action="#"
        onSubmit={this.handleSubmit}
        className="flex flex-col gap-6"
        ref={this.formRef}
      >
        <h2>New Profile</h2>
        <label htmlFor="name" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900">Name</span>
          <input
            ref={this.nameRef}
            type="text"
            name="name"
            id="name"
            className={clsx(
              'block w-full p-2.5',
              'text-gray-900 text-sm',
              'bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500',
              'focus:border-blue-500',
            )}
          />
          {errors.name && (
            <span className="block text-red-700">{errors.name}</span>
          )}
        </label>
        <label htmlFor="birthDate" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900">Birth Date</span>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            ref={this.birthDateRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.birthDate && (
            <span className="text-red-700">{errors.birthDate}</span>
          )}
        </label>
        <label htmlFor="primaryLanguage" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900">Favourite Language</span>
          <select
            name="primaryLanguage"
            id="primaryLanguage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            ref={this.primaryLanguageRef}
          >
            <option value="Javascript">Javascript</option>
            <option value="Java">Java</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
          </select>
        </label>
        <label htmlFor="opensource" className="flex items-center gap-2">
          <input
            type="checkbox"
            name="opensource"
            id="opensource"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            ref={this.opensourceRef}
          />
          <span
            className="text-sm font-medium text-gray-900"
          >
            Contributing to open source
          </span>
        </label>
        <div className="">
          <span
            className="text-sm font-medium text-gray-900"
          >
            Experience
          </span>
          <label htmlFor="experience-junior" className="flex items-center gap-2">
            <input
              type="radio"
              name="experience"
              id="experience-junior"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              value="Junior"
              ref={this.experienceJuniorRef}
            />
            Junior
          </label>
          <label htmlFor="experience-middle" className="flex items-center gap-2">
            <input
              type="radio"
              name="experience"
              id="experience-middle"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              value="Middle"
              ref={this.experienceMiddleRef}
            />
            Middle
          </label>
          <label htmlFor="experience-senior" className="flex items-center gap-2">
            <input
              type="radio"
              name="experience"
              id="experience-senior"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              value="Senior"
              ref={this.experienceSeniorRef}
            />
            Senior
          </label>
          {errors.experience && (
            <span className="block text-red-700">{errors.experience}</span>
          )}
        </div>
        <label htmlFor="githubUrl" className="flex flex-col gap-2">
          <span
            className="text-sm font-medium text-gray-900"
          >
            Github page
          </span>
          <input
            type="text"
            name="githubUrl"
            id="githubUrl"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            ref={this.githubUrlRef}
          />
          {errors.githubUrl && (
            <span className="text-red-700">{errors.githubUrl}</span>
          )}
        </label>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="avatarUrl"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer text-center"
          >
            <span
              className="text-sm font-medium text-gray-900"
            >
              Upload avatar
            </span>
            <input
              type="file"
              accept="image/*"
              name="avatarUrl"
              id="avatarUrl"
              className="hidden"
              ref={this.avatarUrlRef}
            />
          </label>
          {errors.avatarUrl && (
            <span className="block text-red-700">{errors.avatarUrl}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 items-start">
          <button
            type="submit"
            className="
              p-3
              bg-gray-50 border rounded-lg border-gray-300
              focus:border-blue-500
            "
          >
            Add Profile
          </button>
          {isCreated && (
            <p className="text-green-600">Card is created</p>
          )}
        </div>
      </form>
    );
  }
}

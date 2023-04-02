import React, {
  useEffect, useState,
} from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { isAgeUnder18, isValidUrl } from '../../../utils/validation';
import { ProfileFormModel } from '../../../types/profileForm.model';

interface Props {
  submit?: (profileFormValues: ProfileFormModel) => void;
}

interface State {
  extraValidation: {
    birthDate: string;
    githubUrl: string;
  };
  isCreated: boolean;
}

interface FormValues {
  name: string,
  birthDate: string,
  primaryLanguage: string,
  opensource: boolean,
  experience: string,
  githubUrl: string,
  avatarUrl: FileList,
}

const initialErrors: State['extraValidation'] = {
  birthDate: '',
  githubUrl: '',
};

export const ProfileForm = ({ submit = () => null }: Props) => {
  const [state, setState] = useState<State>({
    isCreated: false,
    extraValidation: initialErrors,
  });
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    const { isCreated } = state;

    if (isCreated) {
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, isCreated: false }));
      }, 3000);
    }
  }, [state]);

  const showAddedMark = () => {
    setState((prevState) => ({
      ...prevState,
      isCreated: true,
    }));
  };

  const extraValidation = (profileFormValues: FormValues): boolean => {
    const {
      birthDate, githubUrl,
    } = profileFormValues;

    const extraErrors = { ...initialErrors };

    if (isAgeUnder18(birthDate)) {
      extraErrors.birthDate = 'User must be at least 18 years old';
    }

    if (!isValidUrl(githubUrl)) {
      extraErrors.githubUrl = 'Link must be valid';
    }

    setState((prevState) => ({ ...prevState, extraValidation: { ...extraErrors } }));

    return Object.values(extraErrors).every((item) => item === '');
  };

  const onSubmit = (data: FormValues) => {
    if (extraValidation(data)) {
      showAddedMark();
      submit({
        ...data,
        avatarUrl: URL.createObjectURL(data.avatarUrl[0]),
      });
      reset();
    }
  };

  const { isCreated } = state;

  const name = register('name', {
    required: true,
    maxLength: 30,
    pattern: /^[A-Z].*/,
  });

  const birthDate = register('birthDate', {
    required: true,
  });

  const primaryLanguage = register('primaryLanguage', {
    required: true,
  });

  const opensource = register('opensource');

  const experience = register('experience', {
    required: true,
  });

  const githubUrl = register('githubUrl', {
    required: true,
  });

  const avatarUrl = register('avatarUrl', {
    required: true,
  });

  return (
    <form
      data-testid="form"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2>New Profile</h2>
      <label htmlFor="name" className="flex flex-col">
        <span className="block mb-2 text-sm font-medium text-gray-900">Name</span>
        <input
          type="text"
          id="name"
          name={name.name}
          onChange={name.onChange}
          onBlur={name.onBlur}
          ref={name.ref}
          className={clsx(
            'block w-full p-2.5',
            'text-gray-900 text-sm',
            'bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500',
            'focus:border-blue-500',
          )}
        />
        {errors.name && errors.name.type === 'required'
          && <span className="block text-red-700">Name is required</span>}
        {errors.name && errors.name.type === 'maxLength'
          && <span className="block text-red-700">Max length exceeded (30 characters)</span>}
        {errors.name && errors.name.type === 'pattern'
          && <span className="block text-red-700">Name should start with capital</span>}
      </label>
      <label htmlFor="birthDate" className="flex flex-col">
        <span className="block mb-2 text-sm font-medium text-gray-900">Birth Date</span>
        <input
          type="date"
          id="birthDate"
          name={birthDate.name}
          onChange={birthDate.onChange}
          onBlur={birthDate.onBlur}
          ref={birthDate.ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.birthDate && errors.birthDate.type === 'required'
          && <span className="block text-red-700">Birth date is required</span>}
        {state.extraValidation.birthDate
          && <span className="block text-red-700">{state.extraValidation.birthDate}</span>}
      </label>
      <label htmlFor="primaryLanguage" className="flex flex-col">
        <span className="block mb-2 text-sm font-medium text-gray-900">Primary Language</span>
        <select
          id="primaryLanguage"
          name={primaryLanguage.name}
          onChange={primaryLanguage.onChange}
          onBlur={primaryLanguage.onBlur}
          ref={primaryLanguage.ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="Javascript">Javascript</option>
          <option value="Java">Java</option>
          <option value="PHP">PHP</option>
          <option value="Python">Python</option>
        </select>
        {errors.primaryLanguage && errors.primaryLanguage.type === 'required'
          && <span className="block text-red-700">Primary language is required</span>}
      </label>
      <label htmlFor="opensource" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="opensource"
          name={opensource.name}
          onChange={opensource.onChange}
          onBlur={opensource.onBlur}
          ref={opensource.ref}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
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
            name={experience.name}
            onChange={experience.onChange}
            onBlur={experience.onBlur}
            ref={experience.ref}
            id="experience-junior"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            value="Junior"
          />
          Junior
        </label>
        <label htmlFor="experience-middle" className="flex items-center gap-2">
          <input
            type="radio"
            name={experience.name}
            onChange={experience.onChange}
            onBlur={experience.onBlur}
            ref={experience.ref}
            id="experience-middle"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            value="Middle"
          />
          Middle
        </label>
        <label htmlFor="experience-senior" className="flex items-center gap-2">
          <input
            type="radio"
            name={experience.name}
            onChange={experience.onChange}
            onBlur={experience.onBlur}
            ref={experience.ref}
            id="experience-senior"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            value="Senior"
          />
          Senior
        </label>
        {errors.experience && (
          <span className="block text-red-700">Experience is required</span>
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
          id="githubUrl"
          name={githubUrl.name}
          onChange={githubUrl.onChange}
          onBlur={githubUrl.onBlur}
          ref={githubUrl.ref}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.githubUrl && (
          <span className="text-red-700">Github url is required</span>
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
            id="avatarUrl"
            className="hidden"
            name={avatarUrl.name}
            onChange={avatarUrl.onChange}
            onBlur={avatarUrl.onBlur}
            ref={avatarUrl.ref}
          />
        </label>
        {errors.avatarUrl && (
          <span className="block text-red-700">Avatar url is required</span>
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
};

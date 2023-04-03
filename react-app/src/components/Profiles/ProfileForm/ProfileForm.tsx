import React, {
  useEffect, useState,
} from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { isAgeUnder18, isValidUrl, startsWithCapital } from '../../../utils/validation';
import { ProfileFormModel } from '../../../types/profileForm.model';

interface Props {
  submit?: (profileFormValues: ProfileFormModel) => void;
}

interface State {
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

export const ProfileForm = ({ submit = () => null }: Props) => {
  const [state, setState] = useState<State>({
    isCreated: false,
  });
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
    getValues,
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

  const onSubmit = (data: FormValues) => {
    showAddedMark();
    submit({
      ...data,
      avatarUrl: URL.createObjectURL(data.avatarUrl[0]),
    });
    reset();
  };

  const { isCreated } = state;

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
          {...register('name', {
            required: 'Name is required',
            maxLength: 30,
            validate: () => startsWithCapital(getValues('name'))
              || 'Name should start with capital',
          })}
          className={clsx(
            'block w-full p-2.5',
            'text-gray-900 text-sm',
            'bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500',
            'focus:border-blue-500',
          )}
        />
        {errors.name
          && <span role="alert" className="block text-red-700">{errors.name.message}</span>}
      </label>
      <label htmlFor="birthDate" className="flex flex-col">
        <span className="block mb-2 text-sm font-medium text-gray-900">Birth Date</span>
        <input
          type="date"
          id="birthDate"
          {...register('birthDate', {
            required: 'Please enter birthdate',
            validate: (date) => !isAgeUnder18(date) || 'Use must be at least 18 years old',
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.birthDate
          && <span role="alert" className="block text-red-700">{errors.birthDate.message}</span>}
      </label>
      <label htmlFor="primaryLanguage" className="flex flex-col">
        <span className="block mb-2 text-sm font-medium text-gray-900">Primary Language</span>
        <select
          id="primaryLanguage"
          {...register('primaryLanguage', {
            required: 'Primary language is required',
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="Javascript">Javascript</option>
          <option value="Java">Java</option>
          <option value="PHP">PHP</option>
          <option value="Python">Python</option>
        </select>
        {errors.primaryLanguage
          && <span role="alert" className="block text-red-700">{errors.primaryLanguage.message}</span>}
      </label>
      <label htmlFor="opensource" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="opensource"
          {...register('opensource')}
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
            {...register('experience', {
              required: 'Experience is required',
            })}
            id="experience-junior"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            value="Junior"
          />
          Junior
        </label>
        <label htmlFor="experience-middle" className="flex items-center gap-2">
          <input
            type="radio"
            {...register('experience', {
              required: 'Experience is required',
            })}
            id="experience-middle"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            value="Middle"
          />
          Middle
        </label>
        <label htmlFor="experience-senior" className="flex items-center gap-2">
          <input
            type="radio"
            {...register('experience', {
              required: 'Experience is required',
            })}
            id="experience-senior"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            value="Senior"
          />
          Senior
        </label>
        {errors.experience && (
          <span role="alert" className="block text-red-700">{errors.experience.message}</span>
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
          {...register('githubUrl', {
            required: 'Profile url is required',
            validate: () => isValidUrl(getValues('githubUrl')) || 'URL must be valid',
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.githubUrl && (
          <span role="alert" className="text-red-700">{errors.githubUrl.message}</span>
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
            {...register('avatarUrl', {
              required: 'Avatar is required',
            })}
          />
        </label>
        {errors.avatarUrl && (
          <span role="alert" className="block text-red-700">{errors.avatarUrl.message}</span>
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

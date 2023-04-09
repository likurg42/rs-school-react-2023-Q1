import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useRepoContext from '../../../hooks/useRepoContext';
import Input from '../../../components/Input/Input';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Button from '../../../components/Button/Button';
import Form from '../../../components/Form/Form';

interface FormValues {
  language: string,
  keyword: string,
}

export const SearchForm = () => {
  const { filter, updateFilter } = useRepoContext();
  const [filterStored, setFilterStored] = useLocalStorage<FormValues>('form', {
    keyword: filter.keyword,
    language: filter.language
  });
  const {
    register,
    handleSubmit,
    getValues
  } = useForm<FormValues>({
    defaultValues: {
      language: filterStored.language,
      keyword: filterStored.keyword,
    },
  });

  const onSubmit = (data: FormValues) => {
    updateFilter(data);
    setFilterStored(data);
  };

  useEffect(() => () => setFilterStored({
    keyword: getValues('keyword'),
    language: getValues('language'),
  }), [getValues, setFilterStored]);

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Keyword"
        {...register('keyword')}
      />
      <Input
        label="Language"
        {...register('language')}
      />
      <Button isSubmit>
        Search
      </Button>
    </Form>
  );
};

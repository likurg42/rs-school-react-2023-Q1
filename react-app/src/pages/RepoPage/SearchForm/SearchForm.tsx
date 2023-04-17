import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Form from '../../../components/Form/Form';
import { RepoFilter } from '../../../types/filter-repo';
import { useRepositories } from '../../../hooks/useRepositories';

export const SearchForm = () => {
  const { inputFilter, updateCurrentFilter, updateInputFilter } = useRepositories();
  const {
    register,
    handleSubmit,
    getValues
  } = useForm<RepoFilter>({
    defaultValues: inputFilter,
  });

  const onSubmit = (data: RepoFilter) => {
    updateCurrentFilter(data);
    updateInputFilter(data);
  };

  useEffect(() => () => {
    updateInputFilter({
      keyword: getValues('keyword'),
      language: getValues('language'),
    });
  }, [getValues, updateInputFilter]);

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

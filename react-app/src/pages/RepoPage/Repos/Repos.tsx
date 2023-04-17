// import useRepoContext from '../../../hooks/useRepoContext';
import { RepoList } from '../RepoList/RepoList';
import { buildSearchParams } from '../../../common/routes';
import { useGetReposQuery } from '../../../store/services/repoApi';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { useRepositories } from '../../../hooks/useRepositories';

const Repos = () => {
  const { currentFilter } = useRepositories();
  const {
    data, isSuccess, isFetching, isError
  } = useGetReposQuery(buildSearchParams(currentFilter));
  return (
    <>
      {isError && 'Something went terribly wrong...'}
      {isFetching && <LoadingSpinner />}
      {isSuccess && !isFetching && <RepoList repos={data.items} />}
    </>
  );
};

export default Repos;

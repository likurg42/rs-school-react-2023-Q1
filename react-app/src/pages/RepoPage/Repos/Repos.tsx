import useRepoContext from '../../../hooks/useRepoContext';
import { RepoList } from '../RepoList/RepoList';
import { buildSearchParams } from '../../../common/routes';
import { useGetReposQuery } from '../../../store/repoApi';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

const Repos = () => {
  const { filter } = useRepoContext();
  const { data, isSuccess, isFetching } = useGetReposQuery(buildSearchParams(filter));
  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isSuccess && !isFetching && <RepoList repos={data.items} />}
    </>
  );
};

export default Repos;

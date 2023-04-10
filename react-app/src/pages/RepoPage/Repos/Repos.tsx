import useData from '../../../hooks/useData';
import useRepoContext from '../../../hooks/useRepoContext';
import { RepoList } from '../RepoList/RepoList';
import { routes } from '../../../common/routes';

type Response = {
  items: Repo[];
};

const Repos = () => {
  const { filter } = useRepoContext();
  const response = useData<Response>(routes.githubApi(filter));
  const repos = response ? response.read() : null;
  return repos && <RepoList repos={repos.items} />;
};

export default Repos;

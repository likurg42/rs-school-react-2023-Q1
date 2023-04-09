import { RepoCard } from '../RepoCard/RepoCard';

interface Props {
  repos: Repo[] | RepoTest[];
}

export const RepoList = ({ repos }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {repos && repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
  </div>
);

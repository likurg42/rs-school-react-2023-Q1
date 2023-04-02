import { RepoCard } from '../RepoCard/RepoCard';

interface Props {
  repos: Repo[] | RepoTest[];
}

export const RepoList = ({ repos }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {repos && repos.map((repo) => (
      <RepoCard key={repo.id} repo={repo} />
    ))}
    {repos.length === 0 && <h2 className="col-span-3 text-center">Repositories not found</h2>}
  </div>
);

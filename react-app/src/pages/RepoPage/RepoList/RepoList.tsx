import { useModal } from '../../../hooks/useModal';
import Modal from '../Modal/Modal';
import { RepoCard } from '../RepoCard/RepoCard';

interface Props {
  repos: Repo[];
}

export const RepoList = ({ repos }: Props) => {
  const { modalState, toggle } = useModal<Repo>();
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-repo-list>
        {repos.length
          ? repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              open={() => toggle(true, repos.find((currRepo) => currRepo.id === repo.id))}
            />
          ))
          : <p className="text-center justify-self-end">No repositories found</p>}
      </div>
      {modalState.isOpen
        && <Modal isOpen={modalState.isOpen} repo={modalState.data} close={() => toggle(false)} />}
    </>
  );
};

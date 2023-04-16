import { useContext } from 'react';
import { RepoContext } from '../context/RepoContext';

const useRepoContext = () => useContext(RepoContext)!;

export default useRepoContext;

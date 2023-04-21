import { Routes, Route } from 'react-router-dom';
import { RepoPage } from './pages/RepoPage/RepoPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { ProfilesPage } from './pages/ProfilesPage/ProfilesPage';

export const App = () => (
  <>
    <Header />
    <div className="mx-auto px-5 text-gray-900 lg:container">
      <Routes>
        <Route path="/" element={<RepoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </div>
  </>

);

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RepoPage } from './pages/RepoPage/RepoPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { ProfilesPage } from './pages/ProfilesPage/ProfilesPage';

export const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Header />
    <div className="mx-auto px-5 text-gray-900 lg:container">
      <Routes>
        <Route path="/" element={<RepoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

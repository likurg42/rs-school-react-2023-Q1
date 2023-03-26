import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import { withLocation } from './hoc/withLocation';
import ProfilesPage from './pages/ProfilesPage/ProfilesPage';


export default class App extends React.Component<unknown> {
  HeaderWithLocation: React.ComponentType;

  constructor(props: unknown) {
    super(props);
    this.HeaderWithLocation = withLocation(Header);
  }

  render() {
    return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <this.HeaderWithLocation/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/*" element={<NotFoundPage/>}/>
          <Route path="/forms" element={<ProfilesPage/>}/>
        </Routes>
      </BrowserRouter>);
  }
}

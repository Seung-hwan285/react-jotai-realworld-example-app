import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';
import HomePage from './app/home';

const LoginPage = React.lazy(() => import('./app/login'));
const RegisterPage = React.lazy(() => import('./app/register'));
const ProfilePage = React.lazy(() => import('./app/profile'));
const SettingPage = React.lazy(() => import('./app/setting'));
const SinglePage = React.lazy(() => import('./app/single'));
const NewArticlePage = React.lazy(() => import('./app/newArticle'));
const EditPage = React.lazy(() => import('./app/edit'));

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/article/:slug" element={<SinglePage />} />
            <Route path="/new-article" element={<NewArticlePage />} />
            <Route path="/edit/:slug" element={<EditPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

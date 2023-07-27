import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './app/register';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import SettingPage from './app/setting';
import ProfilePage from './app/profile';
import SinglePage from './app/single';
import NewArticlePage from './app/newArticle';
import LoginPage from './app/login';
import HomePage from './app/home';

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/article/:slug" element={<SinglePage />} />
          <Route path="/new-article" element={<NewArticlePage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

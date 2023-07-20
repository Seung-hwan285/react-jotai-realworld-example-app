import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './app/home';
import LoginPage from './app/login';
import RegisterPage from './app/register';
import Footer from './components/layout/footer';
import Navbar from './components/layout/navbar';
import SettingPage from './app/setting';
import ProfilePage from './app/profile';

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<Home />}
              // errorElement={<RootBoundary />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Routes>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

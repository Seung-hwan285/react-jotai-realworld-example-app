import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './app/home';
import LoginPage from './app/login';
import RegisterPage from './app/register';
import RootBoundary from './lib/provider/failback';
import Footer from './components/layout/footer';
import Navbar from './components/layout/navbar';

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
              errorElement={<RootBoundary />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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

import React from 'react';
import { Link } from 'react-router-dom';
import useNavBar from './hook/navbar';

function Navbar() {
  const { isActiveLink, isLoggedIn, handleLogout } = useNavBar();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
              to="/"
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className={`nav-link`} onClick={handleLogout} to="/">
                  Log out
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActiveLink('/profile') ? 'active' : ''
                  }`}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActiveLink('/login') ? 'active' : ''
                  }`}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActiveLink('/register') ? 'active' : ''
                  }`}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;

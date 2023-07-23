import React from 'react';
import { Link } from 'react-router-dom';
import useNavBar from './hook/useNavbar';
import { PropsAuthNavbar } from '../../lib/utils/type/auth';

function AuthNavbar({ user, isActiveLink }: PropsAuthNavbar) {
  return (
    <>
      {/*<li className="nav-item">*/}
      {/*  <Link className={`nav-link`} onClick={onClick} to="/">*/}
      {/*    Log out*/}
      {/*  </Link>*/}
      {/*</li>*/}

      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveLink('/new-article') ? 'active' : ''}`}
          to="/new-article"
        >
          <i className="ion-compose" />
          &nbsp; New Post
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveLink('/setting') ? 'active' : ''}`}
          to="/setting"
        >
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveLink('/profile') ? 'active' : ''}`}
          to="/profile"
        >
          <img src="" className="user-pic" />
          {user?.user.username}
        </Link>
      </li>
    </>
  );
}

function GuestNavbar({ isActiveLink }: PropsAuthNavbar) {
  return (
    <>
      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveLink('/login') ? 'active' : ''}`}
          to="/login"
        >
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveLink('/register') ? 'active' : ''}`}
          to="/register"
        >
          Sign up
        </Link>
      </li>
    </>
  );
}

function LogoHome({ isActiveLink }: PropsAuthNavbar) {
  return (
    <li className="nav-item">
      <Link className={`nav-link ${isActiveLink('/') ? 'active' : ''}`} to="/">
        Home
      </Link>
    </li>
  );
}

function Navbar() {
  const { isActiveLink, isLoggedIn, user } = useNavBar();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <LogoHome isActiveLink={isActiveLink} />
          {isLoggedIn ? (
            <AuthNavbar user={user} isActiveLink={isActiveLink} />
          ) : (
            <GuestNavbar isActiveLink={isActiveLink} />
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;

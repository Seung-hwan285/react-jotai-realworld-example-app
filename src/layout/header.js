import { route } from '../utils/routes.js';
import { getLocalStroage } from '../utils/storage.js';
import { fetchAuthUserInfo } from '../utils/helper/fetchAuth.js';
import { setHeaderActive } from '../utils/helper/headerActive.js';
import { createNavbarHtml } from '../utils/helper/authForm.js';

function renderHeader(target) {
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-light';
  const headerContainer = document.createElement('div');
  headerContainer.className = 'container';

  const logo = document.createElement('a');
  logo.textContent = 'Conduit';
  logo.className = 'navbar-brand';
  logo.setAttribute('data-link', '/');

  headerContainer.appendChild(logo);
  nav.appendChild(headerContainer);

  if (target) {
    target.appendChild(nav);
  }
}

function Header(target) {
  let user = null;
  renderHeader(target);
  const headerContainer = document.querySelector('.container');

  const updateUserData = async (authToken) => {
    user = await fetchAuthUserInfo(authToken);
  };

  const handleLinkClick = (e) => {
    const link = e.target.dataset.link;

    if (link === '/login' || link === '/register') {
      updateUserData(getLocalStroage('token'));
    }
    route(link);
  };

  const handleClick = () => {
    const ulElement = document.querySelector('.navbar-nav');
    const navbarLogo = document.querySelector('.navbar-brand');
    navbarLogo.addEventListener('click', handleLinkClick);
    ulElement.addEventListener('click', handleLinkClick);
  };

  const render = async () => {
    const navbarElement = document.querySelector('.navbar-nav');
    let navElement = document.querySelector('.nav');

    const authToken = getLocalStroage('token');

    if (!user) {
      await updateUserData(authToken);
    }

    if (!navElement) {
      navElement = document.createElement('ul');
      navElement.className = 'nav navbar-nav pull-xs-right';
    }

    const items = [
      { text: 'Home', link: '/' },
      ...(authToken
        ? [
            {
              text: 'New Article',
              link: '/new-article',
            },
            {
              text: 'Settings',
              link: '/setting',
            },
            {
              text: `${user.username}`,
              link: '/',
            },
          ]
        : [
            {
              text: 'Sign in',
              link: '/login',
            },
            {
              text: 'Sign up',
              link: '/register',
            },
          ]),
    ];

    const getNavbar = createNavbarHtml(items, authToken);

    if (authToken) {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        headerContainer.appendChild(navElement);
      }
    } else {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        headerContainer.appendChild(navElement);
      }
    }

    const currentUrl = window.location.pathname;

    const url = [
      {
        link: '/login',
      },
      {
        link: '/register',
      },
      {
        link: '/new-article',
      },
      {
        link: '/setting',
      },
    ];
    const findUrl = url.find((u) => currentUrl === u.link);
    if (findUrl) {
      setHeaderActive(findUrl);
    }

    handleClick();
  };
  render();

  return {
    render,
  };
}

export default Header;

import { route } from '../utils/routes.js';
import { getLocalStroage } from '../utils/storage.js';
import { fetchAuthUserInfo } from '../utils/helper/fetchAuth.js';
import { navbarItems } from '../utils/helper/authForm.js';

// [] Header 토글 버튼 클릭시 안바뀜

function Header(target) {
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-light';
  const HeaderContainer = document.createElement('div');
  HeaderContainer.className = 'container';

  const LogoElement = document.createElement('a');
  LogoElement.innerText = 'Conduit';
  LogoElement.className = 'navbar-brand';
  LogoElement.setAttribute('data-link', '/');

  HeaderContainer.appendChild(LogoElement);
  nav.appendChild(HeaderContainer);

  target.appendChild(nav);

  const handleLinkClick = (e) => {
    const link = e.target.dataset.link;
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
    const user = await fetchAuthUserInfo(authToken);

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
              link: 'new-article',
            },
            {
              text: 'Settings',
              link: 'setting',
            },
            {
              text: `${user.username}`,
              link: '/',
            },
          ]
        : [
            {
              text: 'Sign in',
              link: 'login',
            },
            {
              text: 'Sign up',
              link: 'register',
            },
          ]),
    ];

    const getNavbar = navbarItems(items, authToken);

    if (authToken) {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        HeaderContainer.appendChild(navElement);
      }
    } else {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        HeaderContainer.appendChild(navElement);
      }
    }

    handleClick();
  };
  render();

  return {
    render,
  };
}

export default Header;

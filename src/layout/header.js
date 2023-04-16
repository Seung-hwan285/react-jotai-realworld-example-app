import { route } from '../utils/routes.js';
import { getLocalStroage } from '../utils/storage.js';
import { fetchAuthUserInfo } from '../utils/helper/fetchAuth.js';
import { navbarItems } from '../utils/helper/authForm.js';

function Header(target) {
  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-light';
  const HeaderContainer = document.createElement('div');
  HeaderContainer.className = 'container';

  const LogoElement = document.createElement('a');
  LogoElement.innerText = `Conduit`;
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
      navElement.innerHTML = getNavbar.join('');
      if (!navbarElement) {
        HeaderContainer.appendChild(navElement);
      }
    } else {
      navElement.innerHTML = getNavbar.join('');
      if (!navbarElement) {
        HeaderContainer.appendChild(navElement);
      }
    }
    // 이 함수는 렌더에서 계속 호출하는데 이전에는 매번 render를 호출할때마다 handleClick 함수가 등록되었다.
    // 그래서 로고버튼을 클릭하면 계속 Header 컴포넌트가 렌더링되는게 아니라 생성이 되서 중첩현상이 일어남
    // 하지만 hadndleClick 함수를 최상위 스코프로 이동시켜서 한번만 등록되므로 중복 문제가 해결
    handleClick();
  };
  render();

  return {
    render,
  };
}

export default Header;

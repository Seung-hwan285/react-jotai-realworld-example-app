import { route } from '../utils/routes.js';
import { getLocalStroage } from '../utils/storage.js';
import { fetchAuthUserInfo } from '../utils/helper/fetchAuth.js';

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

  const handleLinkClick = e => {
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
    const navElement = document.querySelector('.navbar-nav');
    let navbar = document.querySelector('.nav');

    // const navbar = document.createElement('ul');
    // ul.className = 'nav navbar-nav pull-xs-right';

    const authToken = getLocalStroage('token');
    const user = await fetchAuthUserInfo(authToken);

    if (!navbar) {
      navbar = document.createElement('ul');
      navbar.className = 'nav navbar-nav pull-xs-right';
    }

    if (authToken) {
      navbar.innerHTML = /* HTML */ `
        <li class="nav-item">
          <a class="nav-link active" data-link="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-link="new-article">
            <i class="ion-compose"></i>New Article</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-link="setting"
            ><i class="ion-gear-a"></i>Settings</a
          >
        </li>
        <li class="nav-item" data-link="profile">
          <a class="nav-link active" data-link="/">${user.username}</a>
        </li>
      `;

      if (!navElement) {
        HeaderContainer.appendChild(navbar);
      }
    } else {
      navbar.innerHTML = /* HTML */ `
        <li class="nav-item">
          <a class="nav-link active" data-link="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-link="login">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-link="register">Sign up</a>
        </li>
      `;
      if (!navElement) {
        HeaderContainer.appendChild(navbar);
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

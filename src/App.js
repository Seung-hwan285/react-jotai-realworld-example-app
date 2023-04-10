import LoginPage from './pages/LoginPage.js';
import Header from './layout/header.js';
import HomePage from './pages/HomePage.js';
import { initRouter } from './utils/routes.js';
import RegisterPage from './pages/RegisterPage.js';
import SettingPage from './pages/SettingPage.js';
function App({ target }) {
  // Header(target) 이 코드는 렌더링을 시키는게아니라 Header 컴포넌트를 추가하는 코드이다 그래서 계속 중첩이 일어났음
  // 즉 render함수만 실행해서 렌더링되게 만들어준다.

  const header = new Header(target);

  // 근데 지금 문제가 로고를 클릭하면 Header 컴포넌트 추가가 일어나서 중첩이 된다.
  const routes = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      new HomePage(target);
    } else if (pathname === '/login') {
      new LoginPage(target);
    } else if (pathname === '/register') {
      new RegisterPage(target);
    } else if (pathname === '/setting') {
      new SettingPage(target);
    }
  };

  const render = () => {
    initRouter(() => {
      header.render();
      routes();
    });
    routes();
  };

  render();
}

export default App;

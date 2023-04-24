import LoginPage from './pages/LoginPage.js';
import Header from './layout/header.js';
import HomePage from './pages/HomePage.js';
import { initRouter } from './utils/routes.js';
import RegisterPage from './pages/RegisterPage.js';
import SettingPage from './pages/SettingPage.js';
function App({ target }) {
  const header = new Header(target);

  const routes = () => {
    const { pathname } = window.location;

    const pages = [
      { path: '/', component: HomePage },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/setting', component: SettingPage },
    ];

    const page = pages.find((page) => page.path === pathname);

    if (page) {
      new page.component(target);
    }
  };

  const render = () => {
    initRouter(() => {
      routes();
    });
    routes();
  };

  render();
}

export default App;

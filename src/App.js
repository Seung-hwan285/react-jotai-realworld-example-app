import LoginPage from './pages/LoginPage.js';
import Header from './layout/header.js';
import HomePage from './pages/HomePage.js';
import { initRouter } from './utils/routes.js';
import RegisterPage from './pages/RegisterPage.js';
import SettingPage from './pages/SettingPage.js';
import NewArticlePage from './pages/NewArticlePage.js';
import ProfilePage from './pages/ProfilePage.js';
import SinglePage from './pages/SinglePage.js';
import Footer from './layout/footer.js';

function App({ target }) {
  const header = new Header(target);
  const footer = new Footer(target);
  const routes = () => {
    let { pathname } = window.location;

    const pages = [
      { path: '/', component: HomePage },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/setting', component: SettingPage },
      { path: '/new-article', component: NewArticlePage },
      { path: '/profile', component: ProfilePage },
      { path: `/article`, component: SinglePage },
    ];

    if (pathname.includes('/article')) {
      pathname = pathname.slice(0, 8);
    }
    const page = pages.find((page) => page.path === pathname);

    if (page) {
      new page.component(target);
    }
  };

  const render = () => {
    initRouter(() => {
      header.render();
      footer.render();
      routes();
    });
    routes();
  };

  render();
}

export default App;

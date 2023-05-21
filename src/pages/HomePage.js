import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../components/Home/HomeBanner.js';
import HomeMain from '../components/Home/HomeMain.js';
import { appendChildrenToParent, createElement } from '../utils/helper/dom.js';

function renderHome(target) {
  const homeContainer = createElement('div', 'home-page');
  const bannerTop = createElement('div', 'banner');
  const bannerWrapper = createElement('div', 'container');
  const banner = document.querySelector('.banner');

  if (banner) {
    return;
  }

  appendChildrenToParent(bannerTop, bannerWrapper);
  appendChildrenToParent(homeContainer, bannerTop);
  appendChildrenToParent(target, homeContainer);
}

function HomePage(target) {
  cleanHTML.HomePage();
  renderHome(target);

  const render = () => {
    HomeBanner();
    HomeMain();
  };

  render();
}
export default HomePage;

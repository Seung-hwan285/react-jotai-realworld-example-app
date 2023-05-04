import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../components/Home/HomeBanner.js';
import HomeMain from '../components/Home/HomeMain.js';

function renderHome(target) {
  const homeContainer = document.createElement('div');
  homeContainer.className = 'home-page';
  const bannerTop = document.createElement('div');
  bannerTop.className = 'banner';

  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'container';

  const banner = document.querySelector('.banner');

  if (banner) {
    return;
  }

  bannerTop.appendChild(bannerWrapper);
  homeContainer.appendChild(bannerTop);
  target.appendChild(homeContainer);
}

function HomePage(target) {
  cleanHTML.HomePage();

  renderHome(target);

  const bannerWrapper = document.querySelector('.banner .container');

  const render = () => {
    HomeBanner(bannerWrapper);
    HomeMain(bannerWrapper);
  };

  render();
}
export default HomePage;

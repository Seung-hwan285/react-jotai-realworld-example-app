import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../components/Home/HomeBanner.js';
import HomeMain from '../components/Home/HomeMain.js';

function HomePage(target) {
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

  const render = () => {
    cleanHTML.HomePage();
    HomeBanner(bannerWrapper);
    HomeMain(homeContainer);
  };

  render();
}
export default HomePage;

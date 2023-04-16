import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../component/Home/HomeBanner.js';
import HomeRow from '../component/Home/HomeRow.js';

function HomePage(target) {
  const HomeContainer = document.createElement('div');
  HomeContainer.className = 'home-page';
  const BannerContainer = document.createElement('div');
  BannerContainer.className = 'banner';

  const BannerWrapper = document.createElement('div');
  BannerWrapper.className = 'container';

  const container = document.querySelector('.banner');

  if (container) {
    return;
  }

  BannerContainer.appendChild(BannerWrapper);
  HomeContainer.appendChild(BannerContainer);
  target.appendChild(HomeContainer);

  const render = () => {
    cleanHTML.HomePage();
    HomeBanner(BannerWrapper);
    HomeRow(HomeContainer);
  };

  render();
}
export default HomePage;

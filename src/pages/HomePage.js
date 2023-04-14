import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../component/Home/HomeBanner.js';
import HomeRow from '../component/Home/HomeRow.js';

function HomePage(target) {
  const HomeContainer = document.createElement('div');
  HomeContainer.className = 'home-page';
  const BannerContainer = document.createElement('div');
  BannerContainer.className = 'banner';

  const BannerWrpper = document.createElement('div');
  BannerWrpper.className = 'container';

  const container = document.querySelector('.banner');

  if (container) {
    return;
  }

  BannerContainer.appendChild(BannerWrpper);
  HomeContainer.appendChild(BannerContainer);
  target.appendChild(HomeContainer);

  const render = () => {
    cleanHTML.HomePage();
    HomeBanner(BannerWrpper);
    HomeRow(HomeContainer);
  };

  render();
}
export default HomePage;

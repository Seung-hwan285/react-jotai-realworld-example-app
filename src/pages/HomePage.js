import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../components/Home/HomeBanner.js';
import HomeRow from '../components/Home/HomeRow.js';

function HomePage(target) {
  const HomeContainer = document.createElement('div');
  HomeContainer.className = 'home-page';
  const Banner = document.createElement('div');
  Banner.className = 'banner';

  const BannerWrapper = document.createElement('div');
  BannerWrapper.className = 'container';

  const container = document.querySelector('.banner');

  if (container) {
    return;
  }

  Banner.appendChild(BannerWrapper);
  HomeContainer.appendChild(Banner);
  target.appendChild(HomeContainer);

  const render = () => {
    cleanHTML.HomePage();
    HomeBanner(BannerWrapper);
    HomeRow(HomeContainer);
  };

  render();
}
export default HomePage;

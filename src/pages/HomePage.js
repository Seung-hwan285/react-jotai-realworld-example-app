import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../component/Home/HomeBanner.js';
import HomeRow from '../component/Home/HomeRow.js';

function HomePage(target) {
  const HomeContainer = document.createElement('div');
  HomeContainer.className = 'Home__Container';
  const BannerContainer = document.createElement('div');
  BannerContainer.className = 'Banner__Container';

  const container = document.querySelector('.Banner__Wrapper');

  if (container) {
    return;
  }

  const BannerWrapper = document.createElement('div');
  BannerWrapper.className = 'Banner__Wrapper';

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

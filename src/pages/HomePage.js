import { cleanHTML } from '../utils/helper/cleanHTML.js';
import HomeBanner from '../component/Home/HomeBanner.js';

function HomePage(target) {
  const HomeContainer = document.createElement('div');
  HomeContainer.className = 'Banner__Container';
  const container = document.querySelector('.Banner__Wrapper');

  if (container) {
    return;
  }

  const HomeWrapper = document.createElement('div');
  HomeWrapper.className = 'Banner__Wrapper';

  HomeContainer.appendChild(HomeWrapper);
  target.appendChild(HomeContainer);

  const render = () => {
    cleanHTML.HomePage();
    HomeBanner(HomeWrapper);
  };

  render();
}
export default HomePage;

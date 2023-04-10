import { cleanHTML } from '../utils/helper/cleanHTML.js';

function SettingPage(target) {
  const container = document.querySelector('.Setting__Container');
  if (container) {
    return;
  }
  const SettingContainer = document.createElement('div');
  SettingContainer.className = 'Setting__Container';

  const SettingWrapper = document.createElement('div');
  SettingWrapper.className = 'Setting__Wrapper';
  SettingWrapper.innerHTML = `ㅇㅁㄴ`;

  SettingContainer.appendChild(SettingWrapper);

  target.appendChild(SettingContainer);

  const render = () => {
    cleanHTML.SettingPage();
  };

  render();
}
export default SettingPage;

import { cleanHTML } from '../utils/helper/cleanHTML.js';
import { auth_request } from '../lib/auth/requeset.js';
import { getLocalStroage } from '../utils/storage.js';

function SettingPage(target) {
  const container = document.querySelector('.Setting__Container');
  if (container) {
    return;
  }
  const SettingContainer = document.createElement('div');
  SettingContainer.className = 'Setting__Container';

  const SettingWrapper = document.createElement('div');
  SettingWrapper.className = 'Setting__Wrapper';
  SettingWrapper.innerHTML = `<button class="logout">로그아웃</button>`;

  SettingContainer.appendChild(SettingWrapper);

  target.appendChild(SettingContainer);

  const handleLogoutClick = () => {
    const button = document.querySelector('.logout');
    button.addEventListener('click', (e) => {
      auth_request.userLogout('token');
    });
  };

  const render = () => {
    cleanHTML.SettingPage();
    handleLogoutClick();
  };

  render();
}
export default SettingPage;

import { cleanHTML } from '../utils/helper/cleanHTML.js';
import SettingForm from '../components/Setting/SettingForm.js';

function SettingPage(target) {
  const container = document.querySelector('.Setting__Container');
  if (container) {
    return;
  }
  const SettingContainer = document.createElement('div');
  SettingContainer.className = 'Setting__Container';

  const SettingWrapper = document.createElement('div');
  SettingWrapper.className = 'Setting__Wrapper';

  const SettingFormBox = document.createElement('div');
  SettingFormBox.className = 'Setting__Box';

  SettingContainer.appendChild(SettingWrapper);
  SettingContainer.appendChild(SettingFormBox);

  target.appendChild(SettingContainer);

  const render = () => {
    cleanHTML.SettingPage();
    SettingForm(SettingFormBox);
  };

  render();
}
export default SettingPage;

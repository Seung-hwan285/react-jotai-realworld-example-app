import { cleanHTML } from '../utils/helper/cleanHTML.js';
import SettingForm from '../components/Setting/SettingForm.js';
import SettingFormTitle from '../components/Setting/SettingFormTitle.js';

function SettingPage(target) {
  const container = document.querySelector('.settings-page');

  if (container) {
    return;
  }

  const settingContainer = document.createElement('div');
  settingContainer.className = 'settings-page';

  const settingWrapper = document.createElement('div');
  settingWrapper.className = 'container page';

  const settingRow = document.createElement('div');
  settingRow.className = 'row';

  const settingCol = document.createElement('div');
  settingCol.className = 'col-md-6 offset-md-3 col-xs-12';

  settingRow.appendChild(settingCol);
  settingWrapper.appendChild(settingRow);
  settingContainer.appendChild(settingWrapper);

  target.appendChild(settingContainer);

  const render = () => {
    cleanHTML.SettingPage();
    SettingFormTitle(settingCol);
    SettingForm(settingCol);
  };

  render();
}
export default SettingPage;

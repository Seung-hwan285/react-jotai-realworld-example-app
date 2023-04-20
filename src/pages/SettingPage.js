import { cleanHTML } from '../utils/helper/cleanHTML.js';
import SettingForm from '../components/Setting/SettingForm.js';
import SettingFormTitle from '../components/Setting/SettingFormTitle.js';

function SettingPage(target) {
  const container = document.querySelector('.settings-page');

  if (container) {
    return;
  }

  const SettingContainer = document.createElement('div');
  SettingContainer.className = 'settings-page';

  const SettingWrapper = document.createElement('div');
  SettingWrapper.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-6 offset-md-3 col-xs-12';

  row.appendChild(col);
  SettingWrapper.appendChild(row);
  SettingContainer.appendChild(SettingWrapper);

  target.appendChild(SettingContainer);

  const render = () => {
    cleanHTML.SettingPage();
    SettingFormTitle(col);
    SettingForm(col);
  };

  render();
}
export default SettingPage;

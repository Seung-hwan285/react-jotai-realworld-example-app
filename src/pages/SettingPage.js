import { cleanHTML } from '../utils/cleanHTML.js';
import SettingForm from '../components/Setting/SettingForm.js';
import SettingFormTitle from '../components/Setting/SettingFormTitle.js';
import { appendChildrenToParent, createElement } from '../utils/dom.js';

function renderSetting(target) {
  const settingContainer = createElement('div', 'settings-page');
  const settingWrapper = createElement('div', 'container page');
  const settingRow = createElement('div', 'row');
  const settingCol = createElement('div', 'col-md-6 offset-md-3 col-xs-12');

  const container = document.querySelector('.settings-page');

  if (container) {
    return;
  }

  appendChildrenToParent(settingRow, settingCol);
  appendChildrenToParent(settingWrapper, settingRow);
  appendChildrenToParent(settingContainer, settingWrapper);
  appendChildrenToParent(target, settingContainer);
}

function SettingPage(target) {
  cleanHTML.SettingPage();
  renderSetting(target);

  const render = () => {
    SettingFormTitle();
    SettingForm(target);
  };

  render();
}
export default SettingPage;

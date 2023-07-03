"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderSetting(target) {
  const settingContainer = (0, _index.createElement)('div', 'settings-page');
  const settingWrapper = (0, _index.createElement)('div', 'container page');
  const settingRow = (0, _index.createElement)('div', 'row');
  const settingCol = (0, _index.createElement)('div', 'col-md-6 offset-md-3 col-xs-12');
  const container = document.querySelector('.settings-page');
  if (container) {
    return;
  }
  (0, _index.appendChildrenToParent)(settingRow, settingCol);
  (0, _index.appendChildrenToParent)(settingWrapper, settingRow);
  (0, _index.appendChildrenToParent)(settingContainer, settingWrapper);
  (0, _index.appendChildrenToParent)(target, settingContainer);
}
function SettingPage(target) {
  _index.cleanHTML.SettingPage();
  renderSetting(target);
  const render = function () {
    (0, _index.SettingFormTitle)();
    (0, _index.SettingForm)();
  };
  render();
}
var _default = SettingPage;
exports.default = _default;
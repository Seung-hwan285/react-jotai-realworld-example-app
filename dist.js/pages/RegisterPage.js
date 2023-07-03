"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderRegister(target) {
  const registerContainer = (0, _index.createElement)('div', 'auth-page');
  const registerWrapper = (0, _index.createElement)('div', 'container page');
  const registerRow = (0, _index.createElement)('div', 'row');
  const registerCol = (0, _index.createElement)('div', 'col-md-6 offset-md-3 col-xs-12');
  const container = document.querySelector('.auth-page');
  if (container) {
    return;
  }
  (0, _index.appendChildrenToParent)(registerRow, registerCol);
  (0, _index.appendChildrenToParent)(registerWrapper, registerCol);
  (0, _index.appendChildrenToParent)(registerContainer, registerWrapper);
  (0, _index.appendChildrenToParent)(target, registerContainer);
}
function RegisterPage(target) {
  _index.cleanHTML.RegisterPage();
  renderRegister(target);
  const render = function () {
    (0, _index.RegisterFormTitle)();
    (0, _index.RegisterForm)();
  };
  render();
}
var _default = RegisterPage;
exports.default = _default;
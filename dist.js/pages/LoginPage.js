"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderLogin(target) {
  const loginContainer = (0, _index.createElement)('div', 'auth-page');
  const loginWrapper = (0, _index.createElement)('div', 'container page');
  const loginRow = (0, _index.createElement)('div', 'row');
  const loginCol = (0, _index.createElement)('div', 'col-md-6 offset-md-3 col-xs-12');
  const container = document.querySelector('.auth-page');
  if (container) {
    return;
  }
  (0, _index.appendChildrenToParent)(loginRow, loginCol);
  (0, _index.appendChildrenToParent)(loginWrapper, loginRow);
  (0, _index.appendChildrenToParent)(loginContainer, loginWrapper);
  (0, _index.appendChildrenToParent)(target, loginContainer);
}
function LoginPage(target) {
  _index.cleanHTML.LoginPage();
  renderLogin(target);
  const render = function () {
    (0, _index.LoginFormTitle)();
    LoginForm();
  };
  render();
}
var _default = LoginPage;
exports.default = _default;
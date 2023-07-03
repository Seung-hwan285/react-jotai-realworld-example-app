"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function LoginForm() {
  const col = document.querySelector('.offset-md-3');
  const loginFormBox = (0, _index.createElement)('form', 'form');
  (0, _index.appendChildrenToParent)(col, loginFormBox);
  const initialState = {
    email: '',
    password: ''
  };
  const updateState = function (key, value) {
    state[key] = value;
  };
  const handleChange = function (e) {
    const _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    updateState(name, value);
  };
  const handleLoginSubmit = async function (e) {
    e.preventDefault();
    const loginDate = {
      ...state
    };
    const token = await _index.auth_request.userLogin(loginDate);
    (0, _index.setLocalStroage)('token', token);
    const authToken = await (0, _index.fetchAuthUserInfo)((0, _index.getLocalStroage)('token'));
    (0, _index.setCookie)('authToken', JSON.stringify(authToken), 7);
    if (token) {
      (0, _index.route)('/');
    }
  };
  const render = function () {
    const items = [{
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      id: 'email',
      className: 'form-control form-control-lg'
    }, {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      id: 'password',
      className: 'form-control form-control-lg'
    }];
    const getInputFiled = (0, _index.createInputFields)(items);
    loginFormBox.innerHTML = getInputFiled + _index.buttonLogin;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.addEventListener('change', handleChange);
    });
    const form = document.querySelector('.form');
    form.addEventListener('submit', handleLoginSubmit);
  };
  const state = initialState;
  render();
  return {
    state,
    handleChange
  };
}
var _default = LoginForm;
exports.default = _default;
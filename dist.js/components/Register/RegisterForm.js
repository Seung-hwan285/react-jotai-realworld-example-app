"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function RegisterForm() {
  const col = document.querySelector('.offset-md-3 ');
  const registerFormBox = (0, _index.createElement)('form', 'form');
  (0, _index.appendChildrenToParent)(col, registerFormBox);
  const initialState = {
    username: '',
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
  const handleRegisterSubmit = async function (e) {
    e.preventDefault();
    const registerData = {
      ...state
    };
    const user = await _index.auth_request.userRegister(registerData);
    if (user) {
      (0, _index.route)('/');
    }
  };
  const render = function () {
    const items = [{
      placeholder: 'Username',
      name: 'username',
      type: 'text',
      id: 'username',
      className: 'form-control form-control-lg'
    }, {
      placeholder: 'Email',
      name: 'email',
      id: 'email',
      type: 'text',
      className: 'form-control form-control-lg'
    }, {
      placeholder: 'Password',
      name: 'password',
      id: 'password',
      type: 'password',
      className: 'form-control form-control-lg'
    }];
    const getInputFiled = (0, _index.createInputFields)(items);
    registerFormBox.innerHTML = getInputFiled + _index.buttonRegister;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.addEventListener('change', handleChange);
    });
    const form = document.querySelector('.form');
    form.addEventListener('submit', handleRegisterSubmit);
  };
  const state = initialState;
  render();
  return {
    handleChange,
    state
  };
}
var _default = RegisterForm;
exports.default = _default;
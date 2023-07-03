"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderLogoutButton() {
  return "\n       <hr />\n      <button class=\"btn btn-outline-danger logout\">\n        Or click here to logout.\n      </button>\n      ";
}
function SettingForm() {
  const col = document.querySelector('.offset-md-3 ');
  const settingFormBox = (0, _index.createElement)('form', 'form');
  const paintSettingDiv = (0, _index.createElement)('div', '');
  paintSettingDiv.innerHTML = renderLogoutButton();
  (0, _index.appendChildrenToParent)(col, settingFormBox, paintSettingDiv);
  const initialState = {
    username: '',
    bio: '',
    email: '',
    image: ''
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
  const handleUpdateUserSubmit = async function (e) {
    e.preventDefault();
    const settingData = {
      ...state,
      authToken: (0, _index.getLocalStroage)('token')
    };
    const data = await _index.auth_request.userUpdate(settingData);
    (0, _index.setCookie)('authToken', JSON.stringify(data.user), 7);
    if (data) {
      (0, _index.route)('/');
    }
  };
  const handleLogoutClick = async function () {
    await _index.auth_request.userLogout('token');
  };
  const render = function () {
    const authToken = JSON.parse((0, _index.getCookie)('authToken'));
    const items = [{
      className: 'form-control',
      id: 'image',
      name: 'image',
      type: 'text',
      placeholder: 'URL of profile picture',
      value: "".concat(authToken.image)
    }, {
      className: 'form-control form-control-lg',
      type: 'text',
      name: 'username',
      placeholder: 'Your Name',
      value: "".concat(authToken.username)
    }, {
      id: 'bio',
      className: 'form-control form-control-lg',
      rows: '8',
      name: 'bio',
      placeholder: 'Short bio about you',
      value: "".concat(authToken.bio)
    }, {
      className: 'form-control form-control-lg email',
      id: 'email',
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      value: "".concat(authToken.email)
    }, {
      className: 'form-control form-control-lg',
      type: 'password',
      placeholder: 'Password'
    }];
    const getInputField = (0, _index.createInputFields)(items);
    settingFormBox.innerHTML = getInputField + _index.buttonSetting;
    const inputs = document.querySelectorAll('input ,textarea');
    inputs.forEach(function (input) {
      return input.addEventListener('change', handleChange);
    });
    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUpdateUserSubmit);
    const button = document.querySelector('.logout');
    button.addEventListener('click', handleLogoutClick);
  };
  const state = initialState;
  render();
  return {
    state,
    handleChange,
    handleUpdateUserSubmit
  };
}
var _default = SettingForm;
exports.default = _default;
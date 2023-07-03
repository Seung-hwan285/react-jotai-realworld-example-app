"use strict";

var _SettingForm = _interopRequireDefault(require("../SettingForm.js"));
var _cookie = require("../../../utils/cookie");
var _storage = require("../../../utils/storage");
var _request = require("../../../lib/auth/request");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('SettingForm', function () {
  const TOKEN_NAME = 'authToken';
  const mockCookie = [{
    email: 'test@test.com',
    username: 'test_user',
    bio: 'test_bio',
    token: 'test_token'
  }];
  beforeEach(function () {
    document.cookie = "".concat(TOKEN_NAME, "=").concat(JSON.stringify(mockCookie));
    (0, _storage.setLocalStroage)(TOKEN_NAME);
    (0, _storage.setSessionStroage)(TOKEN_NAME);
  });
  test('returns a cookie value given a cookie name', function () {
    const result = JSON.parse((0, _cookie.getCookie)(TOKEN_NAME));
    expect(result).toEqual(mockCookie);
  });
  test('removes a cookie by setting its expiration date to the past', function () {
    document.cookie = "".concat(TOKEN_NAME, "=dummyValue; expires=Fri, 13 May 2023 00:00:00 UTC; path=/;");
    (0, _cookie.removeCookie)(TOKEN_NAME);
    expect(document.cookie).not.toMatch(TOKEN_NAME);
  });
  test('updates state when input values change', function () {
    // for input element test
    const inputElements = document.createElement('input');
    const form = document.createElement('form');
    form.className = 'form';
    const button = document.createElement('button');
    button.className = 'logout';
    document.body.appendChild(inputElements);
    form.appendChild(button);
    document.body.appendChild(form);
    const settingForm = new _SettingForm.default();
    const events = [{
      target: {
        name: 'image',
        value: 'test_image'
      }
    }, {
      target: {
        name: 'username',
        value: 'hwan'
      }
    }, {
      target: {
        name: 'bio',
        value: 'test_bio'
      }
    }, {
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    }];
    const expectedStates = [{
      image: 'test_image',
      username: '',
      bio: '',
      email: ''
    }, {
      image: 'test_image',
      username: 'hwan',
      bio: '',
      email: ''
    }, {
      image: 'test_image',
      username: 'hwan',
      bio: 'test_bio',
      email: ''
    }, {
      image: 'test_image',
      username: 'hwan',
      bio: 'test_bio',
      email: 'test@test.com'
    }];
    events.forEach(function (event, idx) {
      settingForm.handleChange(event);
      expect(settingForm.state).toEqual(expectedStates[idx]);
    });
  });
  test('updates state when input values change and user update is successful', async function () {
    (0, _SettingForm.default)();
    const mockResponse = {
      user: {
        username: 'hwan2',
        bio: 'test',
        email: 'test_email',
        image: 'test_image'
      }
    };
    const settingData = {
      username: 'hwan',
      bio: 'test',
      email: 'test@test.com',
      image: 'test_image'
    };
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedData = mockResponse;
    const actualData = await _request.auth_request.userUpdate(settingData);
    expect(actualData).toEqual(expectedData);
  });
});
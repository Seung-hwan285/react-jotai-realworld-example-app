"use strict";

var _RegisterForm = _interopRequireDefault(require("../RegisterForm"));
var _dom = require("@testing-library/dom");
var _request = require("../../../lib/auth/request");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('RegisterForm', function () {
  const EMAIL = 'Email';
  const PASSWORD = 'Password';
  const USER_NAME = 'Username';
  test('initializes with empty email or password or username', function () {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);
    (0, _RegisterForm.default)();
    expect(_dom.screen.getByPlaceholderText(EMAIL).value).toBe('');
    expect(_dom.screen.getByPlaceholderText(PASSWORD).value).toBe('');
    expect(_dom.screen.getByPlaceholderText(USER_NAME).value).toBe('');
  });
  test('updates state when input values change', function () {
    const registerForm = new _RegisterForm.default();
    const events = [{
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    }, {
      target: {
        name: 'password',
        value: '123'
      }
    }, {
      target: {
        name: 'username',
        value: 'hwan'
      }
    }];
    const expectedState = [{
      email: 'test@test.com',
      password: '',
      username: ''
    }, {
      email: 'test@test.com',
      password: '123',
      username: ''
    }, {
      email: 'test@test.com',
      password: '123',
      username: 'hwan'
    }];
    events.forEach(function (event, idx) {
      registerForm.handleChange(event);
      expect(registerForm.state).toEqual(expectedState[idx]);
    });
  });
  test('returns registered after authentication', async function () {
    const mockResponse = {
      user: {
        username: 'hwan'
      }
    };
    const registerData = {
      email: 'test@test.com',
      password: '123',
      username: 'hwan'
    };
    fetch.mockResponse(JSON.stringify(mockResponse));
    const data = await _request.auth_request.userRegister(registerData);
    const username = data.user.username;
    const expectedUserName = mockResponse.user.username;
    expect(username).toEqual(expectedUserName);
  });
});
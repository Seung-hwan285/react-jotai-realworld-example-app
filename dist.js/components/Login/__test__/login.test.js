"use strict";

var _LoginForm = _interopRequireDefault(require("../LoginForm"));
var _dom = require("@testing-library/dom");
var _request = require("../../../lib/auth/request");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('LoginForm', function () {
  const EMAIL = 'Email';
  const PASSWORD = 'Password';
  test('initializes with empty email and password', function () {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);
    (0, _LoginForm.default)();
    expect(_dom.screen.getByPlaceholderText(EMAIL).value).toBe('');
    expect(_dom.screen.getByPlaceholderText(PASSWORD).value).toBe('');
  });
  test('updates state when input values change', function () {
    const loginForm = new _LoginForm.default();
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
    }];
    const expectedStates = [{
      email: 'test@test.com',
      password: ''
    }, {
      email: 'test@test.com',
      password: '123'
    }];
    events.forEach(function (event, idx) {
      loginForm.handleChange(event);
      expect(loginForm.state).toEqual(expectedStates[idx]);
    });
  });
  test('returns login token after authentication', async function () {
    const mockResponse = {
      user: {
        token: 'abc123'
      }
    };
    const loginData = {
      email: 'test@test.com',
      password: '123'
    };
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedToken = mockResponse.user.token;
    const actualToken = await _request.auth_request.userLogin(loginData);
    expect(actualToken).toEqual(expectedToken);
  });
});
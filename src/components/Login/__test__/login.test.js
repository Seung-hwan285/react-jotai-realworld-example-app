import LoginForm from '../LoginForm';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import { auth_request } from '../../../lib/auth/request';

describe('LoginForm', () => {
  test('should have initial state with empty email and password', () => {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);

    LoginForm();

    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });

  test('state update when entering login input', () => {
    const loginForm = new LoginForm();

    const eventEmail = {
      target: {
        name: 'email',
        value: 'test@test.com',
      },
    };

    loginForm.handleLoginChange(eventEmail);
    expect(loginForm.state.email).toEqual('test@test.com');
    expect(loginForm.state.password).toEqual('');

    const eventPassword = {
      target: {
        name: 'password',
        value: '123',
      },
    };

    loginForm.handleLoginChange(eventPassword);
    expect(loginForm.state.email).toEqual('test@test.com');
    expect(loginForm.state.password).toEqual('123');
  });

  test('get Token after login', async () => {
    const mockResponse = {
      user: {
        token: 'abc123',
        status: 200,
      },
    };

    const loginData = {
      email: 'test@test.com',
      password: '123',
    };

    fetch.mockResponse(JSON.stringify(mockResponse));

    const expectedToken = mockResponse.user.token;
    const actualToken = await auth_request.userLogin(loginData);

    expect(actualToken).toEqual(expectedToken);
  });
});

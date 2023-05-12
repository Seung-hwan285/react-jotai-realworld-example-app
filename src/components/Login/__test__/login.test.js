import LoginForm from '../LoginForm';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';

import { auth_request } from '../../../lib/auth/request';
import { createElement } from '../../../utils/helper/dom';

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

    const expectedState = {
      email: 'test@test.com',
      password: '',
    };

    loginForm.handleChange(eventEmail);
    expect(loginForm.state).toEqual(expectedState);

    const eventPassword = {
      target: {
        name: 'password',
        value: '123',
      },
    };

    loginForm.handleChange(eventPassword);

    const expectedState2 = {
      email: 'test@test.com',
      password: '123',
    };
    expect(loginForm.state).toEqual(expectedState2);
  });

  test('should successfully login and return token', async () => {
    const mockResponse = {
      user: {
        token: 'abc123',
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

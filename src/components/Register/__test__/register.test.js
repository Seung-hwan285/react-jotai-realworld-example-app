import { screen } from '@testing-library/dom';
import RegisterForm from '../RegisterForm';
import '@testing-library/jest-dom';
import { auth_request } from '../../../lib/auth/request';

describe('RegisterForm', () => {
  const EMAIL = 'Email';
  const PASSWORD = 'Password';
  const USER_NAME = 'Username';

  test('should have inital state with empty and password and username', () => {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);

    RegisterForm();
    expect(screen.getByPlaceholderText(EMAIL)).toHaveValue('');
    expect(screen.getByPlaceholderText(PASSWORD)).toHaveValue('');
    expect(screen.getByPlaceholderText(USER_NAME)).toHaveValue('');
  });

  test('updates state when input values change', () => {
    const registerForm = new RegisterForm();

    const events = [
      {
        target: {
          name: 'email',
          value: 'test@test.com',
        },
      },
      {
        target: {
          name: 'password',
          value: '123',
        },
      },
      {
        target: {
          name: 'username',
          value: 'hwan',
        },
      },
    ];

    const expectedState = [
      {
        email: 'test@test.com',
        password: '',
        username: '',
      },
      {
        email: 'test@test.com',
        password: '123',
        username: '',
      },
      {
        email: 'test@test.com',
        password: '123',
        username: 'hwan',
      },
    ];

    events.forEach((event, idx) => {
      registerForm.handleChange(event);
      expect(registerForm.state).toEqual(expectedState[idx]);
    });
  });

  test('should successfully register a new user and return their username ', async () => {
    const mockResponse = {
      user: {
        username: 'hwan',
      },
    };

    const registerData = {
      email: 'test@test.com',
      password: '123',
      username: 'hwan',
    };

    fetch.mockResponse(JSON.stringify(mockResponse));

    const data = await auth_request.userRegister(registerData);

    const { username } = data.user;
    const expectedUserName = mockResponse.user.username;
    expect(username).toEqual(expectedUserName);
  });
});

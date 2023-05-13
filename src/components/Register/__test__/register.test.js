import { screen } from '@testing-library/dom';
import RegisterForm from '../RegisterForm';
import '@testing-library/jest-dom';
import { auth_request } from '../../../lib/auth/request';
describe('registerForm', () => {
  test('should have inital state with empty and password and username', () => {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);

    RegisterForm();
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
    expect(screen.getByPlaceholderText('Username')).toHaveValue('');
  });

  test('updates state when input values change', () => {
    const registerForm = new RegisterForm();

    const eventUsername = {
      target: {
        name: 'username',
        value: 'hwan',
      },
    };

    registerForm.handleChange(eventUsername);

    const expectedState = {
      email: '',
      password: '',
      username: 'hwan',
    };

    expect(registerForm.state).toEqual(expectedState);
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

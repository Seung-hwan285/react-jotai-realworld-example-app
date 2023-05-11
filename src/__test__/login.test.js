import LoginForm from '../components/Login/LoginForm';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

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
});

import LoginForm from '../components/Login/LoginForm';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

describe('LoginForm', () => {
  test('should have initial state with empty email and password', () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="offset-md-3"></div>`;
    document.body.appendChild(wrapper);
    LoginForm();

    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });
});

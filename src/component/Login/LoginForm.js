import { route } from '../../utils/routes.js';
import { setLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/requeset.js';
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';

function LoginForm(target) {
  const LoginFormBox = document.createElement('form');
  LoginFormBox.className = 'form';

  target.appendChild(LoginFormBox);
  console.log(target);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    console.log(email);
    const token = await auth_request.userLogin(email, password);
    setLocalStroage('token', token);
    if (token) {
      route('/');
    }
  };

  const render = () => {
    LoginFormBox.innerHTML = /* HTML */ `
      <fieldset class="form-group">
        ${Input({
          placeholder: 'Email',
          type: 'text',
          id: 'email',
          className: 'form-control form-control-lg',
        })}
      </fieldset>
      <fieldset class="form-group">
        ${Input({
          placeholder: 'Password',
          type: 'password',
          id: 'password',
          className: 'form-control form-control-lg',
        })}
      </fieldset>
      ${Button({
        className: 'btn btn-lg btn-primary pull-xs-right',
        type: 'submit',
        text: 'Sign in',
      })}
    `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUserSubmit);
  };

  render();
}
export default LoginForm;

import { auth_request } from '../../lib/auth/requeset.js';
import { route } from '../../utils/routes.js';
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';

function RegisterForm(target) {
  const RegisterForm = document.createElement('form');
  RegisterForm.className = 'form';

  target.appendChild(RegisterForm);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = auth_request.userRegister(username, email, password);

    if (user) {
      route('/');
    }
  };

  const render = () => {
    RegisterForm.innerHTML = /* HTML */ `
      <fieldset class="form-group">
        ${Input({
          placeholder: 'Username',
          type: 'text',
          id: 'username',
          className: 'form-control form-control-lg',
        })}
      </fieldset>

      <fieldset class="form-group">
        ${Input({
          placeholder: 'Email',
          id: 'email',
          type: 'text',
          className: 'form-control form-control-lg',
        })}
      </fieldset>

      <fieldset class="form-group">
        ${Input({
          placeholder: 'Password',
          id: 'password',
          type: 'password',
          className: 'form-control form-control-lg',
        })}
      </fieldset>

      ${Button({
        className: 'btn btn-lg btn-primary pull-xs-right',
        type: 'submit',
        text: 'Sign up',
      })}
    `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleRegisterSubmit);
  };
  render();
}
export default RegisterForm;

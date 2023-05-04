import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import { buttonRegister, inputFileds } from '../../utils/helper/authForm.js';

function RegisterForm(registerCol) {
  const registerFormBox = document.createElement('form');
  registerFormBox.className = 'form';

  registerCol.appendChild(registerFormBox);

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
    const inputs = [
      {
        placeholder: 'Username',
        type: 'text',
        id: 'username',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Email',
        id: 'email',
        type: 'text',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Password',
        id: 'password',
        type: 'password',
        className: 'form-control form-control-lg',
      },
    ];

    const getInputFiled = inputFileds(inputs);

    registerFormBox.innerHTML = getInputFiled + buttonRegister;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleRegisterSubmit);
  };
  render();
}
export default RegisterForm;

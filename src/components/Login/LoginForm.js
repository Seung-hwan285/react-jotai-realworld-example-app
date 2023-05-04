import { route } from '../../utils/routes.js';
import { setLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/request.js';
import { buttonLogin, inputFileds } from '../../utils/helper/authForm.js';

function LoginForm(col) {
  const loginFormBox = document.createElement('form');
  loginFormBox.className = 'form';

  col.appendChild(loginFormBox);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const token = await auth_request.userLogin(email, password);
    setLocalStroage('token', token);
    if (token) {
      route('/');
    }
  };

  const render = () => {
    const inputs = [
      {
        placeholder: 'Email',
        type: 'text',
        id: 'email',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Password',
        type: 'password',
        id: 'password',
        className: 'form-control form-control-lg',
      },
    ];

    const getInputFiled = inputFileds(inputs);

    loginFormBox.innerHTML = getInputFiled + buttonLogin;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUserSubmit);
  };

  render();
}
export default LoginForm;

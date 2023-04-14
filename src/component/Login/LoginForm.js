import { route } from '../../utils/routes.js';
import { setLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/requeset.js';
import { button, inputFileds } from '../../utils/helper/authForm.js';

function LoginForm(target) {
  const LoginFormBox = document.createElement('form');
  LoginFormBox.className = 'form';

  target.appendChild(LoginFormBox);
  console.log(target);

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

    console.log(getInputFiled);

    LoginFormBox.innerHTML = getInputFiled + button;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUserSubmit);
  };

  render();
}
export default LoginForm;

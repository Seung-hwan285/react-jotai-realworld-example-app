import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import { buttonRegister, inputFileds } from '../../utils/helper/authForm.js';

function RegisterForm(registerCol) {
  const registerFormBox = document.createElement('form');
  registerFormBox.className = 'form';

  registerCol.appendChild(registerFormBox);

  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const updateState = (key, value) => {
    state[key] = value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      ...state,
    };

    const user = auth_request.userRegister(registerData);

    if (user) {
      route('/');
    }
  };

  const render = () => {
    const items = [
      {
        placeholder: 'Username',
        name: 'username',
        type: 'text',
        id: 'username',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Email',
        name: 'email',
        id: 'email',
        type: 'text',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Password',
        name: 'password',
        id: 'password',
        type: 'password',
        className: 'form-control form-control-lg',
      },
    ];

    const getInputFiled = inputFileds(items);

    registerFormBox.innerHTML = getInputFiled + buttonRegister;

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('change', handleChange);
    });

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleRegisterSubmit);
  };
  const state = initialState;
  render();
}
export default RegisterForm;

import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import {
  buttonRegister,
  createInputFields,
} from '../../utils/helper/authForm.js';
import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function RegisterForm() {
  const col = document.querySelector('.offset-md-3 ');

  const registerFormBox = createElement('form', 'form');
  registerFormBox.className = 'form';

  appendChildrenToParent(col, registerFormBox);

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
    console.log(name);
    updateState(name, value);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      ...state,
    };

    const user = await auth_request.userRegister(registerData);

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

    const getInputFiled = createInputFields(items);

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

  return { handleChange, state };
}
export default RegisterForm;

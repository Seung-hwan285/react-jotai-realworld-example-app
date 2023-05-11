import { route } from '../../utils/routes.js';
import { setLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/request.js';
import { buttonLogin, createInputFields } from '../../utils/helper/authForm.js';
import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function LoginForm() {
  const col = document.querySelector('.offset-md-3');
  const loginFormBox = createElement('form', 'form');
  appendChildrenToParent(col, loginFormBox);
  const initialState = {
    email: '',
    password: '',
  };

  const updateState = (key, value) => {
    state[key] = value;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginDate = {
      ...state,
    };

    const token = await auth_request.userLogin(loginDate);
    setLocalStroage('token', token);
    if (token) {
      route('/');
    }
  };

  const render = () => {
    const items = [
      {
        placeholder: 'Email',
        name: 'email',
        type: 'text',
        id: 'email',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'Password',
        name: 'password',
        type: 'password',
        id: 'password',
        className: 'form-control form-control-lg',
      },
    ];

    const getInputFiled = createInputFields(items);

    loginFormBox.innerHTML = getInputFiled + buttonLogin;

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('change', handleLoginChange);
    });

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleLoginSubmit);
  };

  const state = initialState;
  render();

  return { handleLoginChange, state };
}
export default LoginForm;

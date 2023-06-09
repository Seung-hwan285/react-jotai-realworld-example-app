import {
  auth_request,
  buttonLogin,
  route,
  appendChildrenToParent,
  createElement,
  setLocalStroage,
  createInputFields,
} from './index.js';
import { fetchAuthUserInfo } from '../../lib/auth/helper/fetchAuth.js';
import { getLocalStroage } from '../../utils/storage.js';
import { setCookie } from '../../utils/cookie.js';

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

  const handleChange = (e) => {
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

    const authToken = await fetchAuthUserInfo(getLocalStroage('token'));

    setCookie('authToken', JSON.stringify(authToken), 7);
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
      input.addEventListener('change', handleChange);
    });

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleLoginSubmit);
  };

  const state = initialState;
  render();

  return { state, handleChange };
}
export default LoginForm;

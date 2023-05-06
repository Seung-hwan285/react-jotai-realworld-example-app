import { getLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import { getCookie, removeCookie } from '../../utils/cookie.js';
import {
  buttonSetting,
  createInputFields,
} from '../../utils/helper/authForm.js';

function renderLogoutButton() {
  return `
       <hr />
      <button class="btn btn-outline-danger logout">
        Or click here to logout.
      </button>
      `;
}

function SettingForm(target) {
  const settingFormBox = document.createElement('form');
  settingFormBox.className = 'form';

  const paintSettingDiv = document.createElement('div');
  paintSettingDiv.innerHTML = renderLogoutButton();

  target.appendChild(settingFormBox);
  target.appendChild(paintSettingDiv);

  const initialState = {
    username: '',
    bio: '',
    email: '',
    image: '',
  };

  const updateState = (key, value) => {
    state[key] = value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();

    const settingDate = {
      ...state,
      authToken: getLocalStroage('token'),
    };

    const data = await auth_request.userUpdate(settingDate);

    if (data) {
      route('/');
    }
  };

  const handleLogoutClick = async () => {
    await auth_request.userLogout('token');

    removeCookie('authToken');
    route('/');
  };

  const render = () => {
    const authToken = JSON.parse(getCookie('token'));

    const items = [
      {
        className: 'form-control',
        id: 'image',
        name: 'image',
        type: 'text',
        placeholder: 'URL of profile picture',
        value: `${authToken.image}`,
      },
      {
        className: 'form-control form-control-lg',
        type: 'text',
        name: 'username',
        placeholder: 'Your Name',
        value: `${authToken.username}`,
      },
      {
        id: 'bio',
        className: 'form-control form-control-lg',
        rows: '8',
        name: 'bio',
        placeholder: 'Short bio about you',
        value: `${authToken.bio.replace(/(\r\n|\n|\r)/gm, '')}`,
      },
      {
        className: 'form-control form-control-lg email',
        id: 'email',
        type: 'text',
        name: 'email',
        placeholder: 'Email',
        value: `${authToken.email}`,
      },
      {
        className: 'form-control form-control-lg',
        type: 'password',
        placeholder: 'Password',
      },
    ];

    const getInputField = createInputFields(items);

    settingFormBox.innerHTML = getInputField + buttonSetting;

    const inputs = document.querySelectorAll('input ,textarea');
    inputs.forEach((input) => input.addEventListener('change', handleChange));

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUpdateUserSubmit);

    const button = document.querySelector('.logout');
    button.addEventListener('click', handleLogoutClick);
  };

  const state = initialState;
  render();
}
export default SettingForm;

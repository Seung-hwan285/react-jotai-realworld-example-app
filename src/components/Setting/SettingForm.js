import { getLocalStroage } from '../../utils/storage.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';

function SettingForm(target) {
  const SettingFormBox = document.createElement('form');
  SettingFormBox.className = 'form';

  const authToken = getLocalStroage('token');

  const paitSetting = () => {
    return `
       <hr />
      <button class="btn btn-outline-danger logout">
        Or click here to logout.
      </button>
      `;
  };
  const paitSettingDiv = document.createElement('div');
  paitSettingDiv.innerHTML = paitSetting();

  target.appendChild(SettingFormBox);
  target.appendChild(paitSettingDiv);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const bio = document.querySelector('.form-control-lg').value;
    const image = document.querySelector('.image');
    const imageValue = image.value.trim() === '' ? null : image.value;

    const data = await auth_request.userUpdate(
      authToken,
      email,
      bio,
      imageValue
    );

    if (data) {
      route('/');
    }
  };

  const handleLogoutClick = async () => {
    const result = await auth_request.userLogout('token');
    if (result) {
      route('/');
    }
  };

  const fetchUser = async () => {
    const user = await fetchAuthUserInfo(authToken);
    return user;
  };

  const render = async () => {
    const user = fetchUser();

    SettingFormBox.innerHTML = /* HTML */ `
      <fieldset>
        <fieldset class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="URL of profile picture"
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Your Name"
          />
        </fieldset>
        <fieldset class="form-group">
          <textarea
            class="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
          ></textarea>
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Email"
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Password"
          />
        </fieldset>
        <button class="btn btn-lg btn-primary pull-xs-right">
          Update Settings
        </button>
      </fieldset>
    `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUpdateUserSubmit);

    const button = document.querySelector('.logout');
    button.addEventListener('click', handleLogoutClick);
  };
  render();
}
export default SettingForm;

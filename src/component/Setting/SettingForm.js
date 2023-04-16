import { getLocalStroage } from '../../utils/storage.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';

function SettingForm(SettingFormBox) {
  const authToken = getLocalStroage('token');

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
    console.log(user);
    SettingFormBox.innerHTML = /* HTML */ `
      <div>
        <h2>Your Profile</h2>
        <form class="form">
          <div class="setting-in-box">
            ${Input({ value: user.image, type: 'text', className: 'image' })}
            ${Input({
              value: user.username,
              type: 'text',
              className: 'username',
            })}
            <textarea
              class="form-control-lg"
              rows="10"
              placeholder="Short bio about you"
            >
${user.bio}</textarea
            >
            ${Input({
              value: user.email === null ? '' : user.email,
              type: 'text',
              className: 'email',
            })}
            ${Input({
              value: '',
              placeholder: 'New Password',
              type: 'password',
              className: 'password',
            })}
          </div>
          ${Button({
            className: 'form-button',
            type: 'submit',
            text: 'Update Settings',
          })}
        </form>
        ${Button({
          className: 'logout',
          text: 'Logout',
        })}
      </div>
    `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUpdateUserSubmit);

    const button = document.querySelector('.logout');
    button.addEventListener('click', handleLogoutClick);
  };
  render();
}
export default SettingForm;

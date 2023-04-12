import { getLocalStroage } from '../../utils/storage.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { auth_request } from '../../lib/auth/requeset.js';
import { route } from '../../utils/routes.js';

function SettingInput(SettingFormBox) {
  SettingFormBox.innerHTML = `
      <div class="spinner"></div>
    `;
  const authToken = getLocalStroage('token');

  const spinner = document.querySelector('.spinner');
  spinner.style.backgroundImage = 'url("/src/public/spinner.gif")';

  const handleUpdateUserSubmit = () => {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('.email').value;
      const bio = document.querySelector('.form-control-lg').value;
      const image = document.querySelector('.image');
      const imageValue = image.value.trim() === '' ? null : image.value;

      const data = auth_request.userUpdate(authToken, email, bio, imageValue);

      if (data) {
        route('/');
      }
    });
  };

  const handleLogoutClick = () => {
    const button = document.querySelector('.logout');

    button.addEventListener('click', async (e) => {
      const result = await auth_request.userLogout('token');
      if (result) {
        route('/');
      }
    });
  };

  const render = async () => {
    const user = await fetchAuthUserInfo(authToken);
    const paintSettingPage = `
<div>
<h2>Your Profile</h2>
      <form class="form">
        
        <div class="setting-in-box">
            <input class="image" type="text" value="${user.image}">
               
            <input class="username" type="text" value="${user.username}">
           <textarea class="form-control-lg"
                rows="10"
            placeholder="Short bio about you">${user.bio}</textarea>
            <input class="email" type="text" value="${user.email === null ? '' : user.email}">
            <input class="password" type="text"  placeholder="New Password">
        </div>
        <button class="form-button" type="submit">Update Settings</button> 
</form>

<button class="logout">Logout</button>
</div>
    `;
    setTimeout(() => {
      SettingFormBox.innerHTML = paintSettingPage;
      handleUpdateUserSubmit();
      handleLogoutClick();
    }, 2000);
  };
  render();
}
export default SettingInput;

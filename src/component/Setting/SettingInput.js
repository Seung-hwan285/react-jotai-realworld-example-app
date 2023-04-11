import { getLocalStroage } from '../../utils/storage.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';

function SettingInput(SettingFormBox) {
  // const SettingContainer = document.createElement('div');
  // SettingContainer.className = 'Setting__Container';
  //
  // const SettingWrapper = document.createElement('div');
  // SettingWrapper.className = 'Setting__Wrapper';

  const render = async () => {
    const authToken = getLocalStroage('token');
    const user = await fetchAuthUserInfo(authToken);
    console.log(user);

    SettingFormBox.innerHTML = `
<h2>Your Profile</h2>
      <form class="form">
        
        <div class="setting-in-box">
            <input class="image" type="text" value="${user.image}">
               
            <input class="username" type="text" value="${user.username}">
           <textarea class="form-control-lg"
                rows="10"
            placeholder="Short bio about you">${user.bio === null ? '' : user.bio}</textarea>
            <input class="email" type="text" value="${user.email}">
            <input class="password" type="text"  placeholder="New Password">
        </div>
        <button class="form-button" type="submit">Update Settings</button>
      
</form>
    `;
  };
  render();
}
export default SettingInput;

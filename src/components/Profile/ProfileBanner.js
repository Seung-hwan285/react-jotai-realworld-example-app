import { route } from '../../utils/routes.js';

async function ProfileBanner({ username, bio, image }) {
  const col = document.querySelector('.col-xs-12');

  const handleSettingClick = () => {
    route('/setting');
  };

  const render = () => {
    col.innerHTML = /* HTML */ `
      <img src=${image} />
      <h4>${username}</h4>
      <p>${bio}</p>
      <button class="btn btn-sm btn-outline-secondary action-btn">
        <i class="ion-plus-round"></i>
        &nbsp; Edit Profile Setting
      </button>
    `;

    const button = document.querySelector('button');
    button.addEventListener('click', handleSettingClick);
  };
  render();
}
export default ProfileBanner;

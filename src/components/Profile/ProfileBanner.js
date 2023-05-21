import { route } from '../../utils/routes.js';

async function ProfileBanner(user) {
  const col = document.querySelector('.col-xs-12');

  const handleSettingClick = () => {
    route('/setting');
  };

  const render = () => {
    col.innerHTML = /* HTML */ `
      <img src=${user.image} />
      <h4>${user.username}</h4>
      <p>${user.bio}</p>
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

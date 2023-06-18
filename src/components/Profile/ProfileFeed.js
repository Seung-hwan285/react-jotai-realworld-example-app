import { appendChildrenToParent, createElement } from './index.js';

function renderProfile() {
  const page = document.querySelector('.profile-page');
  const profileFeedContainer = createElement('div', 'container');
  const profileFeedRow = createElement('div', 'row');
  const profileFeedCol = createElement(
    'div',
    'col-xs-12 col-md-10 offset-md-1'
  );
  const profileFeedToggle = createElement('div', 'articles-toggle');

  appendChildrenToParent(profileFeedCol, profileFeedToggle);
  appendChildrenToParent(profileFeedRow, profileFeedCol);
  appendChildrenToParent(profileFeedContainer, profileFeedRow);
  appendChildrenToParent(page, profileFeedContainer);
}

function ProfileFeed({ feed, onClick }) {
  renderProfile();
  const profileFeedToggle = document.querySelector('.articles-toggle');

  const render = () => {
    profileFeedToggle.innerHTML = /* HTML */ `
      <ul class="nav nav-pills outline-active feed">
        <li class="nav-item">
          <a class="nav-link ${feed === 'my' ? 'active' : ''}" href=""
            >My Articles</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link ${feed === 'favorite' ? 'active' : ''}" href=""
            >Favorited Articles</a
          >
        </li>
      </ul>
    `;

    const feedContainer = document.querySelector('.feed');
    feedContainer.addEventListener('click', onClick);
  };

  render();
}

export default ProfileFeed;

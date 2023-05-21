import { appendChildrenToParent, createElement } from '../utils/helper/dom.js';
import ProfileBanner from '../components/Profile/ProfileBanner.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';
import ProfileFeed from '../components/Profile/ProfileFeed.js';
import ProfileArticle from '../components/Profile/ProfileArticle.js';
import { fetchAuthUserInfo } from '../utils/helper/fetchAuth.js';
import { getLocalStroage } from '../utils/storage.js';

function renderProfile(target) {
  const profileContainer = createElement('div', 'profile-page');
  const profileInfo = createElement('div', 'user-info');
  const profileWrapper = createElement('div', 'container');
  const profileRow = createElement('div', 'row');
  const profileCol = createElement('div', 'col-xs-12 col-md-10 offset-md-1');

  appendChildrenToParent(profileRow, profileCol);
  appendChildrenToParent(profileWrapper, profileRow);
  appendChildrenToParent(profileInfo, profileWrapper);
  appendChildrenToParent(profileContainer, profileInfo);
  appendChildrenToParent(target, profileContainer);
}

function ProfilePage(target) {
  renderProfile(target);

  const handleFeedClick = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    if (textContent === 'Favorited Articles') {
      updateState({
        feed: 'favorite',
      });
    }

    if (textContent === 'My Articles') {
      updateState({
        feed: 'my',
      });
    }
    render();
  };
  const render = async () => {
    const user = await fetchAuthUserInfo(getLocalStroage('token'));
    cleanHTML.ProfilePage();
    updateState({
      user: user,
    });
    ProfileBanner(user);
    ProfileFeed({
      feed: state,
      onClick: handleFeedClick,
    });
    ProfileArticle({
      feed: state.feed,
      user: state.user,
    });
  };
  render();
}

const initialState = {
  feed: '',
  user: {},
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;
export default ProfilePage;

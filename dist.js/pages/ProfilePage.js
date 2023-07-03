"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderProfile(target) {
  const profileContainer = (0, _index.createElement)('div', 'profile-page');
  const profileInfo = (0, _index.createElement)('div', 'user-info');
  const profileWrapper = (0, _index.createElement)('div', 'container');
  const profileRow = (0, _index.createElement)('div', 'row');
  const profileCol = (0, _index.createElement)('div', 'col-xs-12 col-md-10 offset-md-1');
  const page = document.querySelector('.profile-page');
  if (page) {
    return;
  }
  (0, _index.appendChildrenToParent)(profileRow, profileCol);
  (0, _index.appendChildrenToParent)(profileWrapper, profileRow);
  (0, _index.appendChildrenToParent)(profileInfo, profileWrapper);
  (0, _index.appendChildrenToParent)(profileContainer, profileInfo);
  (0, _index.appendChildrenToParent)(target, profileContainer);
}
function ProfilePage(target) {
  const handleFeedClick = function (e) {
    e.preventDefault();
    const textContent = e.target.textContent;
    if (textContent === 'Favorited Articles') {
      updateState({
        feed: 'favorite'
      });
    }
    if (textContent === 'My Articles') {
      updateState({
        feed: 'my'
      });
    }
    render();
  };
  const render = async function () {
    const user = await (0, _index.fetchAuthUserInfo)((0, _index.getLocalStroage)('token'));
    _index.cleanHTML.ProfilePage();
    renderProfile(target);
    updateState({
      user: user
    });
    (0, _index.ProfileBanner)(state.user);
    (0, _index.ProfileFeed)({
      feed: state.feed,
      onClick: handleFeedClick
    });
    (0, _index.ProfileArticle)({
      feed: state.feed,
      user: state.user
    });
  };
  render();
}
const initialState = {
  feed: '',
  user: {}
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initialState;
var _default = ProfilePage;
exports.default = _default;
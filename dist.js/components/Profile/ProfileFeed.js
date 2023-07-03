"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function renderProfile() {
  const page = document.querySelector('.profile-page');
  const profileFeedContainer = (0, _index.createElement)('div', 'container');
  const profileFeedRow = (0, _index.createElement)('div', 'row');
  const profileFeedCol = (0, _index.createElement)('div', 'col-xs-12 col-md-10 offset-md-1');
  const profileFeedToggle = (0, _index.createElement)('div', 'articles-toggle');
  (0, _index.appendChildrenToParent)(profileFeedCol, profileFeedToggle);
  (0, _index.appendChildrenToParent)(profileFeedRow, profileFeedCol);
  (0, _index.appendChildrenToParent)(profileFeedContainer, profileFeedRow);
  (0, _index.appendChildrenToParent)(page, profileFeedContainer);
}
function ProfileFeed({
  feed,
  onClick
}) {
  renderProfile();
  const profileFeedToggle = document.querySelector('.articles-toggle');
  const render = function () {
    profileFeedToggle.innerHTML = /* HTML */"\n      <ul class=\"nav nav-pills outline-active feed\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link ".concat(feed === 'my' ? 'active' : '', "\" href=\"\"\n            >My Articles</a\n          >\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link ").concat(feed === 'favorite' ? 'active' : '', "\" href=\"\"\n            >Favorited Articles</a\n          >\n        </li>\n      </ul>\n    ");
    const feedContainer = document.querySelector('.feed');
    feedContainer.addEventListener('click', onClick);
  };
  render();
}
var _default = ProfileFeed;
exports.default = _default;
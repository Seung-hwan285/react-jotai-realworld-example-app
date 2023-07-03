"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function ProfileBanner({
  username,
  bio,
  image
}) {
  const col = document.querySelector('.col-xs-12');
  const handleSettingClick = function () {
    (0, _index.route)('/setting');
  };
  const render = function () {
    col.innerHTML = /* HTML */"\n      <img src=".concat(image, " />\n      <h4>").concat(username, "</h4>\n      <p>").concat(bio, "</p>\n      <button class=\"btn btn-sm btn-outline-secondary action-btn\">\n        <i class=\"ion-plus-round\"></i>\n        &nbsp; Edit Profile Setting\n      </button>\n    ");
    const button = document.querySelector('button');
    button.addEventListener('click', handleSettingClick);
  };
  render();
}
var _default = ProfileBanner;
exports.default = _default;
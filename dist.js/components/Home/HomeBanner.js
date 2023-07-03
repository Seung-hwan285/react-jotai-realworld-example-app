"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function HomeBanner() {
  const bannerWrapper = document.querySelector('.banner .container');
  return bannerWrapper.innerHTML = /* HTML */"\n    <h1 class=\"logo-font\">conduit</h1>\n    <p>A place to share your knowledge.</p>\n  ";
}
var _default = HomeBanner;
exports.default = _default;
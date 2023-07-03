"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cleanHTML = require("../utils/cleanHTML.js");
var _HomeBanner = _interopRequireDefault(require("../components/Home/HomeBanner.js"));
var _HomeMain = _interopRequireDefault(require("../components/Home/HomeMain.js"));
var _dom = require("../utils/dom.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderHome(target) {
  const homeContainer = (0, _dom.createElement)('div', 'home-page');
  const bannerTop = (0, _dom.createElement)('div', 'banner');
  const bannerWrapper = (0, _dom.createElement)('div', 'container');
  const banner = document.querySelector('.banner');
  if (banner) {
    return;
  }
  (0, _dom.appendChildrenToParent)(bannerTop, bannerWrapper);
  (0, _dom.appendChildrenToParent)(homeContainer, bannerTop);
  (0, _dom.appendChildrenToParent)(target, homeContainer);
}
function HomePage(target) {
  _cleanHTML.cleanHTML.HomePage();
  renderHome(target);
  const render = function () {
    (0, _HomeBanner.default)();
    (0, _HomeMain.default)();
  };
  render();
}
var _default = HomePage;
exports.default = _default;
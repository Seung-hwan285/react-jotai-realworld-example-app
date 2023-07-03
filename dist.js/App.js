"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoginPage = _interopRequireDefault(require("./pages/LoginPage.js"));
var _header = _interopRequireDefault(require("./layout/header.js"));
var _HomePage = _interopRequireDefault(require("./pages/HomePage.js"));
var _routes = require("./utils/routes.js");
var _RegisterPage = _interopRequireDefault(require("./pages/RegisterPage.js"));
var _SettingPage = _interopRequireDefault(require("./pages/SettingPage.js"));
var _NewArticlePage = _interopRequireDefault(require("./pages/NewArticlePage.js"));
var _ProfilePage = _interopRequireDefault(require("./pages/ProfilePage.js"));
var _SinglePage = _interopRequireDefault(require("./pages/SinglePage.js"));
var _footer = _interopRequireDefault(require("./layout/footer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function App({
  target
}) {
  const header = new _header.default(target);
  const footer = new _footer.default(target);
  const routes = function () {
    let pathname = window.location.pathname;
    const pages = [{
      path: '/',
      component: _HomePage.default
    }, {
      path: '/login',
      component: _LoginPage.default
    }, {
      path: '/register',
      component: _RegisterPage.default
    }, {
      path: '/setting',
      component: _SettingPage.default
    }, {
      path: '/new-article',
      component: _NewArticlePage.default
    }, {
      path: '/profile',
      component: _ProfilePage.default
    }, {
      path: "/article",
      component: _SinglePage.default
    }];
    if (pathname.includes('/article')) {
      pathname = pathname.slice(0, 8);
    }
    const page = pages.find(function (page) {
      return page.path === pathname;
    });
    if (page) {
      new page.component(target);
    }
  };
  const render = function () {
    (0, _routes.initRouter)(function () {
      header.render();
      footer.render();
      routes();
    });
    routes();
  };
  render();
}
var _default = App;
exports.default = _default;
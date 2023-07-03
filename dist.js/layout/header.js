"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _routes = require("../utils/routes.js");
var _storage = require("../utils/storage.js");
var _fetchAuth = require("../lib/auth/helper/fetchAuth.js");
var _headerActive = require("../lib/article/helper/headerActive.js");
var _authForm = require("../lib/auth/helper/authForm.js");
var _dom = require("../utils/dom.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function renderHeader(target) {
  const nav = (0, _dom.createElement)('nav', 'navbar navbar-light');
  const headerContainer = (0, _dom.createElement)('div', 'container');
  const logo = (0, _dom.createElement)('a', 'navbar-brand');
  logo.textContent = 'Conduit';
  logo.setAttribute('data-link', '/');
  (0, _dom.appendChildrenToParent)(headerContainer, logo);
  (0, _dom.appendChildrenToParent)(nav, headerContainer);
  (0, _dom.appendChildrenToParent)(target, nav);
}
function Header(target) {
  let user = null;
  renderHeader(target);
  const headerContainer = document.querySelector('.container');
  const updateUserData = async function (authToken) {
    user = await (0, _fetchAuth.fetchAuthUserInfo)(authToken);
  };
  const handleLinkClick = function (e) {
    const link = e.target.dataset.link;
    if (link === '/login' || link === '/register') {
      updateUserData((0, _storage.getLocalStroage)('token'));
    }
    (0, _routes.route)(link);
  };
  const handleClick = function () {
    const ulElement = document.querySelector('.navbar-nav');
    const navbarLogo = document.querySelector('.navbar-brand');
    navbarLogo.addEventListener('click', handleLinkClick);
    ulElement.addEventListener('click', handleLinkClick);
  };
  const render = async function () {
    const navbarElement = document.querySelector('.navbar-nav');
    let navElement = document.querySelector('.nav');
    const authToken = (0, _storage.getLocalStroage)('token');
    if (!user) {
      await updateUserData(authToken);
    }
    if (!navElement) {
      navElement = (0, _dom.createElement)('ul', 'nav navbar-nav pull-xs-right');
    }
    const items = [{
      text: 'Home',
      link: '/'
    }].concat(_toConsumableArray(authToken ? [{
      text: 'New Article',
      link: '/new-article'
    }, {
      text: 'Settings',
      link: '/setting'
    }, {
      text: "".concat(user.username),
      link: '/profile'
    }] : [{
      text: 'Sign in',
      link: '/login'
    }, {
      text: 'Sign up',
      link: '/register'
    }]));
    const getNavbar = (0, _authForm.createNavbarHtml)(items, authToken);
    if (authToken) {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        headerContainer.appendChild(navElement);
      }
    } else {
      navElement.innerHTML = getNavbar;
      if (!navbarElement) {
        headerContainer.appendChild(navElement);
      }
    }
    const currentUrl = window.location.pathname;
    const url = [{
      link: '/login'
    }, {
      link: '/register'
    }, {
      link: '/new-article'
    }, {
      link: '/setting'
    }, {
      link: '/profile'
    }];
    const findUrl = url.find(function (u) {
      return currentUrl === u.link;
    });
    if (findUrl) {
      (0, _headerActive.setHeaderActive)(findUrl);
    }
    handleClick();
  };
  render();
  return {
    render
  };
}
var _default = Header;
exports.default = _default;
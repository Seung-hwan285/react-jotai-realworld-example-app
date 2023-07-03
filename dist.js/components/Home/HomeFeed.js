"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getNavElement = getNavElement;
exports.renderFeedToggleContainer = renderFeedToggleContainer;
exports.renderNoArticle = renderNoArticle;
var _index = require("./index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getNavElement(index) {
  return document.querySelector(".nav-pills .nav-item:nth-child(".concat(index, ") a"));
}
function renderFeedToggleContainer(tagList) {
  return (/*HTML*/"<div class=\"feed-toggle\">\n  <ul class=\"nav nav-pills outline-active\">\n    ".concat(tagList, "\n  </ul>\n</div>")
  );
}
function renderNoArticle(col, message) {
  const noArticles = document.createElement('div');
  noArticles.className = 'article-preview';
  noArticles.textContent = message;
  col.appendChild(noArticles);
}
function HomeFeed({
  activeFeed,
  onClick
}) {
  const col = document.querySelector('.col-md-9');
  const tag = (0, _index.getSessionStroage)('selectTag');
  const token = (0, _index.getLocalStroage)('token');
  const items = _toConsumableArray(token ? [{
    text: 'Your Feed'
  }, {
    text: 'Global Feed'
  }, {
    text: tag !== null ? "#".concat(tag) : ''
  }] : [{
    text: 'Global Feed'
  }, {
    text: tag !== null ? "#".concat(tag) : ''
  }]);
  const tagList = (0, _index.createTagNavPillsHtml)(items);
  const setActiveNavElement = function (navElements) {
    navElements.forEach(function (navElement) {
      if (activeFeed === Object.keys(navElement)[0]) {
        Object.values(navElement)[0].classList.add('active');
      } else {
        Object.values(navElement)[0].classList.remove('active');
      }
    });
  };
  const render = function () {
    if (tag && token) {
      col.innerHTML = renderFeedToggleContainer(tagList);
    } else {
      col.innerHTML = renderFeedToggleContainer(tagList);
    }
    const navElements = _toConsumableArray(token ? [{
      your: getNavElement(1)
    }, {
      global: getNavElement(2)
    }, {
      getTag: getNavElement(3)
    }] : [{
      global: getNavElement(1)
    }, {
      getTag: getNavElement(2)
    }]);
    if (token) {
      switch (activeFeed) {
        case 'global':
          setActiveNavElement(navElements, 2);
          break;
        case 'getTag':
          setActiveNavElement(navElements, 3);
          break;
        case 'your':
          setActiveNavElement(navElements, 1);
          renderNoArticle(col, 'No articles are here... yet.');
          break;
      }
    } else {
      switch (activeFeed) {
        case 'global':
          setActiveNavElement(navElements, 1);
          break;
        case 'getTag':
          setActiveNavElement(navElements, 2);
          break;
      }
    }
    const feed = document.querySelector('.feed-toggle');
    feed.addEventListener('click', onClick);
  };
  render();
}
var _default = HomeFeed;
exports.default = _default;
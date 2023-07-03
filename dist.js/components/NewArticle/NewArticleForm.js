"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function NewArticleForm() {
  const col = document.querySelector('.offset-md-1');
  const newArticleBox = (0, _index.createElement)('form', 'form');
  (0, _index.appendChildrenToParent)(col, newArticleBox);
  const initialState = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  const updateState = function (key, value) {
    state[key] = value;
  };
  const handleChange = function (e) {
    const _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    updateState(name, value);
  };
  const handleArticleSubmit = async function (e) {
    e.preventDefault();
    const articleData = {
      ...state,
      authToken: (0, _index.getLocalStroage)('token')
    };
    const data = _index.article_request.createArticle(articleData);
    if (data) {
      (0, _index.route)('/');
    }
  };
  const handleTagSubmit = function (e) {
    if (e.key === 'Enter') {
      updateState('tagList', [].concat(_toConsumableArray(state.tagList), [e.target.value]));
      const tagList = document.querySelector('.tag-list');
      tagList.innerHTML = state.tagList.map(function (tag) {
        return "<span class=\"tag-pill tag-default\">>".concat(tag, "</span>");
      }).join('');
    }
  };
  const render = function () {
    const items = [{
      placeholder: 'Article Title',
      name: 'title',
      type: 'text',
      className: 'form-control form-control-lg'
    }, {
      placeholder: 'What`s this article about?',
      name: 'description',
      type: 'text',
      className: 'form-control'
    }, {
      placeholder: 'Write your article (in markdown)',
      name: 'body',
      className: 'form-control',
      rows: '8'
    }, {
      placeholder: 'Enter tags',
      name: 'tag',
      id: 'tag',
      type: 'text',
      className: 'form-control'
    }];
    const getInputFiled = (0, _index.createInputFields)(items);
    newArticleBox.innerHTML = getInputFiled + _index.buttonNewArticle;
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(function (input) {
      input.addEventListener('change', handleChange);
    });
    const tag = document.querySelector('#tag');
    tag.addEventListener('keyup', handleTagSubmit);
    const form = document.querySelector('.btn');
    form.addEventListener('click', handleArticleSubmit);
  };
  const state = initialState;
  render();
}
var _default = NewArticleForm;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoadingSpinner = _interopRequireDefault(require("../commons/LoadingSpinner.js"));
var _index = require("./index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function renderSingle(target) {
  const singleContainer = (0, _index.createElement)('div', 'article-page');
  const singleBanner = (0, _index.createElement)('div', 'banner');
  const container = (0, _index.createElement)('div', 'container article');
  (0, _index.appendChildrenToParent)(singleBanner, container);
  (0, _index.appendChildrenToParent)(singleContainer, singleBanner);
  (0, _index.appendChildrenToParent)(target, singleContainer);
}
function SinglePage(target) {
  _index.cleanHTML.SinglePage();
  const spinner = (0, _LoadingSpinner.default)();
  target.appendChild(spinner);
  const render = async function () {
    const pathname = window.location.pathname;
    const token = (0, _index.getLocalStroage)('token');
    const userPromise = _index.article_request.getSingleArticle(pathname.split('/')[2]);
    const userCommentPromise = _index.comment_request.getComments(pathname.split('/')[2]);
    const authTokenPromise = (0, _index.fetchAuthUserInfo)(token);
    const _await$Promise$all = await Promise.all([userPromise, userCommentPromise, authTokenPromise]),
      _await$Promise$all2 = _slicedToArray(_await$Promise$all, 3),
      user = _await$Promise$all2[0],
      comment = _await$Promise$all2[1],
      authToken = _await$Promise$all2[2];
    renderSingle(target);
    updateState({
      user: user,
      comment: comment,
      token: authToken
    });
    (0, _index.SingleBanner)(state);
    (0, _index.SingleContent)(state.user);
    (0, _index.SingleComment)(state);
    target.removeChild(spinner);
  };
  render();
}
const initialState = {
  user: {},
  comment: {},
  token: ''
};
const updateState = function (nextState) {
  state = {
    ...state,
    ...nextState
  };
};
let state = initialState;
var _default = SinglePage;
exports.default = _default;
"use strict";

var _App = _interopRequireDefault(require("./App.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = document.querySelector('.app');
new _App.default({
  target: app
});
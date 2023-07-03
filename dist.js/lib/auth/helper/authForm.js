"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNavbarHtml = exports.createInputFields = exports.buttonSetting = exports.buttonRegister = exports.buttonNewArticle = exports.buttonLogin = void 0;
var _Input = _interopRequireDefault(require("../../../commons/Input.js"));
var _Button = _interopRequireDefault(require("../../../commons/Button.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createInputFields = function (inputs) {
  return inputs.map(function ({
    placeholder,
    name,
    type,
    id,
    className,
    rows,
    value
  }) {
    if (!rows) {
      return (/* HTML */"\n          <fieldset class=\"form-group\">\n            ".concat((0, _Input.default)({
          placeholder,
          name,
          type,
          id,
          className,
          value
        }), "\n          </fieldset>\n        ")
      );
    } else {
      return (/* HTML */"\n          <fieldset class=\"form-group\">\n            <textarea\n              id=\"".concat(id, "\"\n              class=\"").concat(className, "\"\n              rows=\"").concat(!!rows && rows, "\"\n              name=\"").concat(name, "\"\n              placeholder=\"").concat(placeholder, "\"\n            >\n").concat(value ? value : '', "</textarea\n            >\n          </fieldset>\n        ")
      );
    }
  }).join('');
};
exports.createInputFields = createInputFields;
const createNavbarHtml = function (items, authToken) {
  return items.map(function ({
    text,
    link
  }) {
    return (/* HTML */"\n        <li class=\"nav-item\">\n          <a\n            class=\"nav-link ".concat(text === 'Home' ? 'active' : '', "\"\n            data-link=\"").concat(link, "\"\n          >\n            ").concat(authToken && text === 'New Article' ? '<i class="ion-compose"></i>' : '', "\n            ").concat(authToken && text === 'Settings' ? '<i class="ion-gear-a"></i>' : '', "\n            ").concat(text, "\n          </a>\n        </li>\n      ")
    );
  }).join('');
};
exports.createNavbarHtml = createNavbarHtml;
const buttonLogin = (0, _Button.default)({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Sign in'
});
exports.buttonLogin = buttonLogin;
const buttonRegister = (0, _Button.default)({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Sign up'
});
exports.buttonRegister = buttonRegister;
const buttonSetting = (0, _Button.default)({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Update Settings'
});
exports.buttonSetting = buttonSetting;
const buttonNewArticle = (0, _Button.default)({
  className: 'btn btn-lg pull-xs-right btn-primary',
  type: 'button',
  text: 'Publish Article'
});
exports.buttonNewArticle = buttonNewArticle;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dom = require("../utils/dom.js");
function Footer(target) {
  const footer = (0, _dom.createElement)('footer', '');
  const render = function () {
    footer.innerHTML = /* HTML */"\n      <div class=\"container\">\n        <a href=\"/\" class=\"logo-font\">conduit</a>\n        <span class=\"attribution\">\n          An interactive learning project from\n          <a href=\"https://thinkster.io\">Thinkster</a>. Code &amp; design\n          licensed under MIT.\n        </span>\n      </div>\n    ";
  };
  target.appendChild(footer);
  render();
  return {
    render
  };
}
var _default = Footer;
exports.default = _default;
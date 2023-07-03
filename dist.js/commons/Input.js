"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dom = require("../utils/dom.js");
function Input({
  name,
  value,
  placeholder,
  id,
  type,
  className
}) {
  const tagList = id === 'tag' && (0, _dom.createElement)('div', 'tag-list');
  return (/* HTML */"\n    <input\n      name=\"".concat(name, "\"\n      class=\"").concat(className, "\"\n      id=\"").concat(id, "\"\n      type=\"").concat(type, "\"\n      value=\"").concat(value === undefined ? '' : value, "\"\n      placeholder=\"").concat(placeholder, "\"\n    />\n\n    ").concat(tagList ? tagList.outerHTML : '', "\n  ")
  );
}
var _default = Input;
exports.default = _default;
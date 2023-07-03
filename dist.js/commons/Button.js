"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function Button({
  className,
  type,
  text
}) {
  return (/* HTML */"\n    <button class=\"".concat(className, "\" type=\"").concat(type, "\">").concat(text, "</button>\n  ")
  );
}
var _default = Button;
exports.default = _default;
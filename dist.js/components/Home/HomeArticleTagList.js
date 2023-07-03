"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function HomeArticleTagList(tagList) {
  return (/* HTML */"\n    <ul class=\"tag-list\">\n      ".concat(tagList.map(function (tag) {
      return "<li class=\"tag-default tag-pill tag-outline\">".concat(tag, "</li>");
    }).join(''), "\n    </ul>\n  ")
  );
}
var _default = HomeArticleTagList;
exports.default = _default;
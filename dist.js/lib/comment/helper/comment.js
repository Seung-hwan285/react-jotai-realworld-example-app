"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComments = exports.createCommentForm = void 0;
const createCommentForm = function (image) {
  return (/* HTML */"\n    <hr />\n    <form class=\"card comment-form\">\n      <div class=\"card-block\">\n        <textarea\n          class=\"form-control\"\n          placeholder=\"Write a comment...\"\n          rows=\"3\"\n        ></textarea>\n      </div>\n      <div class=\"card-footer\">\n        <img src=".concat(image, " class=\"comment-author-img\" />\n        <button class=\"btn btn-sm btn-primary\">Post Comment</button>\n      </div>\n    </form>\n  ")
  );
};
exports.createCommentForm = createCommentForm;
const createComments = function (comments, token) {
  return comments.map(function ({
    body,
    author,
    createdAt,
    id
  }) {
    const iconClass = author.username === token.username ? "<i data-set=\"".concat(id, "\" class=\"ion-trash-a\"></i>") : '';
    return "\n        <hr/>\n          <div class=\"card card-container\">\n            <div class=\"card-block\">\n              <p class=\"card-text\">\n                    ".concat(body, "\n              </p>\n            </div>\n            <div class=\"card-footer\">\n              <a href=\"\" class=\"comment-author\">\n                <img\n                  src=").concat(author.image, "\n                  class=\"comment-author-img\"\n                />\n              </a>\n              &nbsp;\n              <a href=\"\" class=\"comment-author\">").concat(author.username, "</a>\n              <span class=\"date-posted\">").concat(createdAt, "</span>\n                <span class=\"mod-options\">\n                ").concat(iconClass, "\n              </span>\n            </div>\n          </div>\n        </div>\n      </div>");
  }).join('');
};
exports.createComments = createComments;
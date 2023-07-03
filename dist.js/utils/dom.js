"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domRemove = exports.createElement = exports.appendChildrenToParent = void 0;
const domRemove = function (domList) {
  return domList.forEach(function (dom) {
    return dom.remove();
  });
};
exports.domRemove = domRemove;
const createElement = function (tagName, className) {
  const element = document.createElement(tagName);
  if (tagName !== 'img' && className) {
    element.className = className;
  } else {
    element.src = className;
  }
  return element;
};
exports.createElement = createElement;
const appendChildrenToParent = function (parent, ...children) {
  children.forEach(function (child) {
    return parent?.appendChild(child);
  });
};
exports.appendChildrenToParent = appendChildrenToParent;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextPageIndex = exports.createPageNumberList = void 0;
const getNextPageIndex = function (textContent, activePage) {
  switch (textContent) {
    case '<<':
      return 1;
    case '<':
      const previousPageIndex = activePage - 1;
      if (previousPageIndex > 0) {
        return previousPageIndex;
      } else {
        return '<';
      }
    case '>>':
      return 20;
    case '>':
      const nextPageIndex = activePage + 1;
      if (nextPageIndex < 27) {
        return nextPageIndex;
      } else {
        return '>';
      }
    default:
      return Number(textContent);
  }
};
exports.getNextPageIndex = getNextPageIndex;
const createPageNumberList = function () {
  const initFirst = Array.from({
    length: 10
  }, function (val, idx) {
    return idx + 1;
  });
  const initSecond = Array.from({
    length: 10
  }, function (val, idx) {
    return idx + 11;
  });
  const symbols = ['<<', '<', '>', '>>'];
  const firstList = symbols.slice(0, 2).concat(initFirst, symbols.slice(2, 4));
  const secondList = symbols.slice(0, 2).concat(initSecond, symbols.slice(2, 4));
  const pageNumberList = Array.from(firstList).concat(Array.from(secondList));
  return pageNumberList;
};
exports.createPageNumberList = createPageNumberList;
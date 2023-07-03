"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = exports.initRouter = exports.ROUTE_CHANGE_EVENT = void 0;
const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';
exports.ROUTE_CHANGE_EVENT = ROUTE_CHANGE_EVENT;
const initRouter = function (onRoute) {
  window.addEventListener('popstate', onRoute);
  window.addEventListener(ROUTE_CHANGE_EVENT, function (e) {
    const nextUrl = e.detail.nextUrl;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};
exports.initRouter = initRouter;
const route = function (nextUrl) {
  if (nextUrl) {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl
      }
    }));
  }
};
exports.route = route;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHeaderActive = void 0;
const setHeaderActive = function (currentUrl) {
  const link = currentUrl.link;
  const navbar = document.querySelectorAll('.nav-link');
  navbar.forEach(function (n) {
    if (n.classList.contains('active')) {
      n.classList.remove('active');
    }
  });
  switch (link) {
    case '/login':
      navbar[1].classList.add('active');
      break;
    case '/register':
      navbar[2].classList.add('active');
      break;
    case '/new-article':
      navbar[1].classList.add('active');
      break;
    case '/setting':
      navbar[2].classList.add('active');
      break;
    case '/profile':
      navbar[3].classList.add('active');
      break;
  }
};
exports.setHeaderActive = setHeaderActive;
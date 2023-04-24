export const setHeaderActive = (currentUrl) => {
  const { link } = currentUrl;

  const navbar = document.querySelectorAll('.nav-link');
  switch (link) {
    case '/login':
      navbar.forEach((n) => {
        if (n.classList.contains('active')) {
          n.classList.remove('active');
        }
      });
      navbar[1].classList.add('active');
      break;
    case '/register':
      navbar.forEach((n) => {
        if (n.classList.contains('active')) {
          n.classList.remove('active');
        }
      });
      navbar[2].classList.add('active');
      break;
    case '/setting':
      navbar.forEach((n) => {
        if (n.classList.contains('active')) {
          n.classList.remove('active');
        }
      });
      navbar[2].classList.add('active');
      break;
    case '/new-article':
      navbar.forEach((n) => {
        if (n.classList.contains('active')) {
          n.classList.remove('active');
        }
      });
      navbar[1].classList.add('active');
      break;
  }
};

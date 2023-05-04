export const setHeaderActive = (currentUrl) => {
  const { link } = currentUrl;

  const navbar = document.querySelectorAll('.nav-link');

  navbar.forEach((n) => {
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
    case '/setting':
      navbar[2].classList.add('active');
      break;
    case '/new-article':
      navbar[1].classList.add('active');
      break;
  }
};

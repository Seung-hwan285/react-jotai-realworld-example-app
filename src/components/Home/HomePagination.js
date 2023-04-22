function HomePagination(col) {
  const nav = document.createElement('nav');

  const ul = document.createElement('ul');
  ul.className = 'pagination';

  nav.appendChild(ul);
  col.appendChild(nav);

  const handleNextPageClick = async (e) => {
    console.log(e.target.parentNode);
    const page = Array.from(document.querySelectorAll('.page-item'));
    const activeItem = page.find((item) => item.classList.contains('active'));
    const { textContent } = e.target;

    console.log(textContent);
    if (
      textContent !== '<<' &&
      textContent !== '>>' &&
      textContent !== '<' &&
      textContent !== '>'
    ) {
      e.target.parentNode.classList.add('active');
      activeItem.classList.remove('active');

      const pageNumber = Number(textContent);
    }
  };

  const render = () => {
    ul.innerHTML = `
      <li class="page-item">
        <a class="page-link"><<</a>
      </li>
      
      <li class="page-item">
        <a class="page-link "><</a>
      </li>
      
      <li class="page-item active">
        <a class="page-link">1</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">2</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">3</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">4</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">5</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">6</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">7</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">8</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">9</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">10</a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">>></a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link">></a>
      </li>`;

    const page = document.querySelector('.pagination');
    page.addEventListener('click', handleNextPageClick);
  };

  render();
}
export default HomePagination;

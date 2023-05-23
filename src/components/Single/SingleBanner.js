import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function SingleBanner({ article }) {
  const articleMeta = createElement('div', 'article-meta');
  const container = document.querySelector('.article');

  const render = () => {
    articleMeta.innerHTML = /* HTML */ `
      <a href=""><img src=${article.author.image} /></a>
      <div class="info">
        <a href="" class="author">${article.author.username}</a>
        <span class="date">${article.createdAt}</span>
      </div>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">${article.favoritesCount}</span>
      </button>
    `;
    appendChildrenToParent(container, articleMeta);
  };

  render();
}
export default SingleBanner;

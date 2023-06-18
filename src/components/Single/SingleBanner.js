import {
  appendChildrenToParent,
  article_request,
  createElement,
  getLocalStroage,
  route,
} from './index.js';

function SingleBanner({ user, comment, token }) {
  const articleMeta = createElement('div', 'article-meta');
  const container = document.querySelector('.article');
  const authToken = getLocalStroage('token');

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const { pathname } = window.location;

    const pid = pathname.split('/')[2].trim();
    await article_request.deleteArticle(pid, authToken);

    route('/');
  };

  const render = async () => {
    const { article } = user;

    const iconName =
      token?.username === article.author.username ? `Delete Article` : '';

    const iconClass =
      token?.username === article.author.username ? `ion-trash-a` : '';

    const paintIcon = () => {
      if (iconName === 'Delete Article') {
        return ` <button class="btn btn-outline-danger btn-sm">
        <i class=${iconClass}></i>
        &nbsp; ${iconName}
      </button>`;
      } else {
        return `&nbsp;`;
      }
    };

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
      &nbsp;&nbsp; ${paintIcon()}
    `;

    appendChildrenToParent(container, articleMeta);

    const meta = document.querySelector('.article-meta');
    meta.addEventListener('click', handleDeleteClick);
  };

  render();
}
export default SingleBanner;

import { appendChildrenToParent, createElement } from './index.js';
import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import { fetchAuthUserInfo } from '../../lib/auth/helper/fetchAuth.js';

function SingleBanner({ article }) {
  const articleMeta = createElement('div', 'article-meta');
  const container = document.querySelector('.article');
  const authToken = getLocalStroage('token');

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const { pathname } = window.location;

    const pid = pathname.split('/')[2].trim();
    await article_request.DeleteArticle(pid, authToken);

    route('/');
  };

  const render = async () => {
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
      <button class="btn btn-outline-danger btn-sm">
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    `;

    appendChildrenToParent(container, articleMeta);

    const meta = document.querySelector('.article-meta');
    meta.addEventListener('click', handleDeleteClick);
  };

  render();
}
export default SingleBanner;

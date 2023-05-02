import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import { article_request } from '../../lib/article/request.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import HomeArticles from './HomeArticles.js';

function RenderData(articles) {
  const col = document.querySelector('.col-md-9');

  const handleArticleTagClick = async (e) => {
    e.preventDefault();

    const { textContent } = e.target;

    setLocalStroage('selectTag', textContent);
    const getTag = getLocalStroage('selectTag');
    const { articles: tagArticles } = await article_request.getTagArticles(
      getTag
    );
    paintTagList(tagArticles);
  };

  const paintTagList = async (tagArticles) => {
    const tag = getLocalStroage('selectTag');

    const token = await fetchAuthUserInfo(getLocalStroage('token'));

    if (tag && token) {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Global Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">#${tag}</a>
            </li>
          </ul>
        </div>
      `;
    } else {
      col.innerHTML = /* HTML */ `
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link" href="">Global Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">#${tag}</a>
            </li>
          </ul>
        </div>
      `;
    }
    HomeArticles(col, tagArticles);
  };

  if (articles && Array.isArray(articles)) {
    articles.map(
      ({
        author,
        body,
        createdAt,
        description,
        favorited,
        favoritesCount,
        slug,
        tagList,
        title,
        updatedAt,
      }) => {
        const article = document.createElement('div');

        article.className = 'article-preview';
        article.innerHTML = /* HTML */ `
          <div class="article-meta">
            <a href="profile.html"><img src=${author.image} /></a>
            <div class="info">
              <a href="" class="author">${author.username}</a>
              <span class="date">${createdAt}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> ${favoritesCount}
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>${title}</h1>
            <p>${description}</p>
            <span>Read more...</span>

            <ul class="tag-list">
              ${Array.isArray(tagList) &&
              tagList
                .map((tag) => {
                  return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
                })
                .join('')}
            </ul>
          </a>
        `;

        col.appendChild(article);

        const tagListElement = document.querySelectorAll('.preview-link');
        tagListElement.forEach((tagElement) => {
          tagElement.addEventListener('click', handleArticleTagClick);
        });
      }
    );
  }
}

export default RenderData;

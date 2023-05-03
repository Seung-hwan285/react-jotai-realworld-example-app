import { getLocalStroage, setLocalStroage } from '../../utils/storage.js';
import { article_request } from '../../lib/article/request.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import HomeArticles from './HomeArticles.js';
import HomeArticleTagList from './HomeArticleTagList.js';
import {
  createTagNavPillsHtml,
  handleGlobalFeedClick,
  handleTagsFeedClick,
  handleYourFeedClick,
} from '../../utils/helper/feedToggle.js';

async function renderFeedWithClickEvent(tagArticles) {
  const handleFeedClick = async (e) => {
    e.preventDefault();
    console.log(e.target);

    const getTag = getLocalStroage('selectTag');

    const { textContent } = e.target;
    const feeds = [
      {
        text: 'Your Feed',
        click: handleYourFeedClick,
      },
      {
        text: 'Global Feed',
        click: handleGlobalFeedClick,
      },
      {
        text: `#${getTag}`,
        click: handleTagsFeedClick,
      },
    ];

    const findEvenet = feeds.find((feed) => feed.text === textContent);

    if (findEvenet) {
      findEvenet.click();
    }
  };

  const col = document.querySelector('.col-md-9');
  const authToken = await fetchAuthUserInfo(getLocalStroage('token'));
  const tag = getLocalStroage('selectTag');

  const items = [
    ...(authToken
      ? [{ text: 'Your Feed' }, { text: 'Global Feed' }, { text: `#${tag}` }]
      : [{ text: 'Global Feed' }, { text: `#${tag}` }]),
  ];

  const getTagList = createTagNavPillsHtml(items, authToken, tag);

  const FeedToggleContainer = /* HTML */ ` <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      ${getTagList}
    </ul>
  </div>`;

  if (tag && authToken) {
    col.innerHTML = FeedToggleContainer;
  } else {
    col.innerHTML = FeedToggleContainer;
  }

  HomeArticles(tagArticles);

  const feed = document.querySelector('.feed-toggle');
  feed.addEventListener('click', handleFeedClick);
}

function HomeArticlePreview(articles) {
  const col = document.querySelector('.col-md-9');

  const handleArticleTagClick = async (e) => {
    e.preventDefault();

    const { textContent } = e.target;

    setLocalStroage('selectTag', textContent);
    const getTag = getLocalStroage('selectTag');
    const { articles: tagArticles } = await article_request.getTagArticles(
      getTag
    );
    renderFeedWithClickEvent(tagArticles);
  };

  const render = () => {
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

              ${Array.isArray(tagList) && HomeArticleTagList(tagList)}
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
  };
  render();
}

export default HomeArticlePreview;

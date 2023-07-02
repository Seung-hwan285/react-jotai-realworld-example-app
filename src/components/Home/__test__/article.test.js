import {
  createPageNumberList,
  getNextPageIndex,
} from '../../../lib/article/helper/mainPagination';
import homeArticles, {
  renderPageNumberLink,
  updateArticles,
} from '../HomeArticles';
import { article_request } from '../../../lib/article/request';
import { HomeArticlePreview, route } from '../index';
import { createMemoryHistory } from 'history';
import { JSDOM } from 'jsdom';

describe('HomeArticle', () => {
  let nav;
  let activePage;
  let pageNumberList;

  const symbols1 = ['<<', '<'];
  const symbols2 = ['>', '>>'];

  beforeEach(() => {
    nav = document.createElement('nav');
    activePage = 1;
    pageNumberList = [
      ...symbols1,
      ...Array.from({ length: 10 }, (val, idx) => idx + 1),
      ...symbols2,
      ...symbols1,
      ...Array.from({ length: 10 }, (val, idx) => idx + 11),
      ...symbols2,
    ];

    document.body.innerHTML = `
      <div class="col-md-9"></div>
      <nav class="pagination"></nav>
    `;
  });
  const articleMock = {
    author: {
      bio: 'hi',
      following: false,
      image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
      username: 'fsda22',
    },
    body: 'test_bio',
    createdAt: '2023-07-01T08:39:33.602Z',
    description: 'test',
    favorited: false,
    favoritesCount: 0,
    slug: 'test_title-158960',
    tagList: ['test_tag'],
    title: 'test_title',
    updatedAt: '2023-07-01T08:39:33.602Z',
  };
  afterEach(() => {
    nav = null;
    activePage = null;
    pageNumberList = null;
  });

  test('returns getNextPageIndex', () => {
    expect(getNextPageIndex('<<', 3)).toBe(1);
    expect(getNextPageIndex('>>', 3)).toBe(20);
    expect(getNextPageIndex('<', 5)).toBe(4);
    expect(getNextPageIndex('>', 5)).toBe(6);
    expect(getNextPageIndex(7, 5)).toBe(7);
  });

  test('returns createPageNumberList', () => {
    expect(createPageNumberList()).toEqual(pageNumberList);
  });

  test('returns renderPageNumberLink for activePage 20', () => {
    activePage = 20;
    renderPageNumberLink(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');

    expect(li.length).toEqual(14);
    expect(li[11].classList.contains('active')).toBe(true);
  });

  test('returns renderPageNumberLink for activePage 1', () => {
    activePage = 1;
    renderPageNumberLink(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');

    expect(li.length).toEqual(14);
    expect(li[2].classList.contains('active')).toBe(true);
  });

  test('removes all page item and article-preview', async () => {
    const col = document.querySelector('.col-md-9');

    const articlesMock = ['article1', 'article2'];

    jest.spyOn(article_request, 'getAllArticles').mockReturnValue(articlesMock);

    const onClick = jest.fn();

    await updateArticles(1, pageNumberList, onClick);

    expect(col.querySelectorAll('.page-item').length).toBe(0);
    expect(col.querySelectorAll('.article-preview').length).toBe(0);
  });

  test('updates history pathname on article click', async () => {
    const onClick = jest.fn();

    const homeArticlePreview = new HomeArticlePreview(articleMock, onClick);
    const { state, slug } = homeArticlePreview;

    homeArticlePreview.handleArticleClick(slug);
    const history = createMemoryHistory();

    const baseUrl = 'http://localhost:5000';

    history.push(`${baseUrl}/article/${slug}`);

    expect(history.location.pathname).toEqual(`${baseUrl}/article/${slug}`);
  });

  // jsdom broken error
  /**
   * @jest-environment node
   */
  test('updates state on favorite click', () => {
    const { document: dom } = new JSDOM('<html><body></body></html>');
    const onClick = jest.fn();

    const homeArticlePreview = new HomeArticlePreview(articleMock, onClick);
    const { state, slug } = homeArticlePreview;

    const button = document.createElement('button');
    button.className = 'ion-heart';
    button.textContent = state.favoritesCount;
    button.dataset.slug = JSON.stringify(slug);

    document.body.appendChild(button);
    button.addEventListener('click', homeArticlePreview.handleFavoriteClick);

    setTimeout(() => {
      const event = new dom.window.Event('click');
      button.dispatchEvent(event);

      expect(state.favorited).toBe(true);
      expect(state.favoritesCount).toBe('1');
    }, 0);
  });
});

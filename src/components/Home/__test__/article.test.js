import {
  createPageNumberList,
  getNextPageIndex,
} from '../../../lib/article/helper/mainPagination';
import { renderPageNumberLink, updateArticles } from '../HomeArticles';
import { article_request } from '../../../lib/article/request';

describe('HomeArticle', () => {
  let nav;
  let activePage;
  let pageNumberList;
  let getAllArticlesMock;
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
  // wait
  //   getAllArticlesMock = jest.fn();
  //
  //   const token = 'test_token';
  //
  //   getAllArticlesMock = article_request.getAllArticles(activePage, token);
  //   getAllArticlesMock.mockResolvedValueOnce({
  //     articles: [
  //       {
  //         author: {
  //           username: 'hwan',
  //           bio: null,
  //           image: 'https://api.realworld.io/images/demo-avatar.png',
  //           following: false,
  //         },
  //         body: 'test body',
  //         createdAt: '2023-06-23',
  //         description: 'test',
  //         favored: false,
  //         favoritesCount: 28,
  //         slug: 'test',
  //         tagList: ['test'],
  //         title: 'test title',
  //         updatedAt: '2023-06-24',
  //       },
  //     ],
  //   });
  // });

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

  test('returns renderPageNumberLink activePage 20', () => {
    activePage = 20;
    renderPageNumberLink(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');

    expect(li.length).toEqual(14);
    expect(li[11].classList.contains('active')).toBe(true);
  });

  test('returns renderPageNumberLink activePage 1', () => {
    activePage = 1;
    renderPageNumberLink(nav, activePage, pageNumberList);
    const li = nav.querySelectorAll('li');

    expect(li.length).toEqual(14);
    expect(li[2].classList.contains('active')).toEqual(true);
  });
});

"use strict";

var _storage = require("../../../utils/storage");
var _HomeTagList = _interopRequireDefault(require("../HomeTagList"));
var _request = require("../../../lib/article/request");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _require = require('../../../lib/tag/request'),
  tag_request = _require.tag_request;
const _require2 = require('../../Home/HomeTagList'),
  updateArticleByTag = _require2.updateArticleByTag;
describe('HomeTagList', function () {
  beforeEach(function () {
    document.body.innerHTML = "\n      <div class=\"row\">\n        <div class=\"col-md-3\"></div>\n      </div>\n    ";
  });
  afterEach(function () {
    document.body.innerHTML = '';
  });
  test('returns tag list after fetching', async function () {
    const mockTagList = {
      tags: ['tag1', 'tag2']
    };
    fetch.mockResponse(JSON.stringify(mockTagList));
    const expectedTags = mockTagList;
    const _await$tag_request$ge = await tag_request.getTagsList(),
      tags = _await$tag_request$ge.tags;
    expect(expectedTags.tags).toEqual(tags);
  });
  test('renders tag list in HomeTagList component', async function () {
    const onClickFeed = jest.fn();
    const onClickTag = jest.fn();
    const mockTagList = {
      tags: ['tag1', 'tag2', 'tag3']
    };
    jest.spyOn(tag_request, 'getTagsList').mockResolvedValue(mockTagList);
    const home = new _HomeTagList.default({
      onClickTag,
      onClickFeed
    });
    await home.render();
    const tagList = document.querySelector('.sidebar .tag-list');
    const tagItems = tagList.querySelectorAll('.tag-pill');
    expect(tagItems.length).toBe(3);
    expect(tagItems[0].textContent.trim()).toBe('tag1');
    expect(tagItems[1].textContent.trim()).toBe('tag2');
    expect(tagItems[2].textContent.trim()).toBe('tag3');
  });
  test('updates sessionStorage with selected tag', async function () {
    const onClickFeed = jest.fn();
    const onClickTag = jest.fn();
    const home = new _HomeTagList.default({
      onClickFeed,
      onClickTag
    });
    const mockFeedElement = document.createElement('div');
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFeedElement);
    jest.spyOn(_request.article_request, 'getTagArticles').mockResolvedValue({
      articles: []
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        textContent: 'tag1'
      }
    };
    await home.handleTagClick(event);
    const tagSpy = (0, _storage.getSessionStroage)('selectTag');
    await updateArticleByTag('tag1', onClickFeed, onClickTag);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(tagSpy).toBe('tag1');
    const HomeFeed = jest.fn();
    HomeFeed({
      activeFeed: 'getTag',
      onClick: onClickFeed
    });
    expect(HomeFeed).toHaveBeenCalledWith({
      activeFeed: 'getTag',
      onClick: onClickFeed
    });
  });
});
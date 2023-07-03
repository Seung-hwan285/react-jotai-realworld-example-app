"use strict";

var _HomeFeed = require("../HomeFeed");
describe('HomeFeed', function () {
  beforeEach(function () {
    document.body.innerHTML = /* HTML */"\n      <div class=\"nav-pills\">\n        <div class=\"nav-item\">\n          <a></a>\n        </div>\n\n        <div class=\"nav-item\">\n          <a></a>\n        </div>\n      </div>\n    ";
  });
  afterEach(function () {
    document.body.innerHTML = '';
  });
  test('renders no article message', function () {
    const col = document.createElement('div');
    const message = 'No article test message...';
    const mockFun = jest.fn();
    jest.spyOn(col, 'appendChild').mockImplementation(mockFun);
    (0, _HomeFeed.renderNoArticle)(col, message);
    expect(mockFun).toHaveBeenCalledTimes(1);
    expect(mockFun).toHaveBeenCalledWith(expect.objectContaining({
      className: 'article-preview',
      textContent: message
    }));
  });
  test('returns the nav element for index 1', function () {
    const index = 1;
    const navElement = (0, _HomeFeed.getNavElement)(index);
    expect(navElement).toBeDefined();
    expect(navElement.tagName).toBe('A');
  });
  test('returns the nav element for index 2', function () {
    const index = 2;
    const navElement = (0, _HomeFeed.getNavElement)(index);
    expect(navElement).toBeDefined();
    expect(navElement.tagName).toBe('A');
  });
  test('returns the HTML string', function () {
    const tagList = jest.fn().mockReturnValue('<li>tag1</li><li>tag2</li>');
    const expectedOutput = /*HTML*/"<div class=\"feed-toggle\">\n  <ul class=\"nav nav-pills outline-active\">\n    <li>tag1</li><li>tag2</li>\n  </ul>\n</div>";
    expect((0, _HomeFeed.renderFeedToggleContainer)(tagList())).toBe(expectedOutput);
    expect(tagList).toHaveBeenCalled();
  });
});
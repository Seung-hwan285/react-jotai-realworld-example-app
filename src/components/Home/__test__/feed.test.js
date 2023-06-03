import {
  getNavElement,
  renderFeedToggleContainer,
  renderNoArticle,
} from '../HomeFeed';

describe('HomeFeed', () => {
  beforeEach(() => {
    document.body.innerHTML = /* HTML */ `
      <div class="nav-pills">
        <div class="nav-item">
          <a></a>
        </div>

        <div class="nav-item">
          <a></a>
        </div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders no article message', () => {
    const col = document.createElement('div');
    const message = 'No article test message...';

    const mockFun = jest.fn();
    jest.spyOn(col, 'appendChild').mockImplementation(mockFun);

    renderNoArticle(col, message);

    expect(mockFun).toHaveBeenCalledTimes(1);
    expect(mockFun).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'article-preview',
        textContent: message,
      })
    );
  });

  test('returns the nav element for index 1', () => {
    const index = 1;
    const navElement = getNavElement(index);

    expect(navElement).toBeDefined();
    expect(navElement.tagName).toBe('A');
  });

  test('returns the nav element for index 2', () => {
    const index = 2;
    const navElement = getNavElement(index);

    expect(navElement).toBeDefined();
    expect(navElement.tagName).toBe('A');
  });

  test('returns the HTML string', () => {
    const tagList = jest.fn().mockReturnValue('<li>tag1</li><li>tag2</li>');

    const expectedOutput = /*HTML*/ `<div class="feed-toggle">
  <ul class="nav nav-pills outline-active">
    <li>tag1</li><li>tag2</li>
  </ul>
</div>`;

    expect(renderFeedToggleContainer(tagList())).toBe(expectedOutput);
    expect(tagList).toHaveBeenCalled();
  });
});

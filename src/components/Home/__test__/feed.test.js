import { getNavElement, renderNoArticle } from '../HomeFeed';
import { appendChildrenToParent, createElement } from '../../../utils/dom';

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
});

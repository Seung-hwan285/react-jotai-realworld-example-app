import { getSessionStroage } from '../../../utils/storage';

const { tag_request } = require('../../../lib/tag/request');
const { updateArticleByTag } = require('../../Home/HomeTagList');
import HomeTagList from '../HomeTagList';
import { article_request } from '../../../lib/article/request';

describe('HomeTagList', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="row">
        <div class="col-md-3"></div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('returns tag list after fetching', async () => {
    const mockTagList = { tags: ['tag1', 'tag2'] };

    fetch.mockResponse(JSON.stringify(mockTagList));

    const expectedTags = mockTagList;
    const { tags } = await tag_request.getTagsList();
    expect(expectedTags.tags).toEqual(tags);
  });

  test('renders tag list in HomeTagList component', async () => {
    const onClickFeed = jest.fn();
    const onClickTag = jest.fn();

    const mockTagList = { tags: ['tag1', 'tag2', 'tag3'] };

    jest.spyOn(tag_request, 'getTagsList').mockResolvedValue(mockTagList);

    const home = new HomeTagList({ onClickTag, onClickFeed });

    await home.render();

    const tagList = document.querySelector('.sidebar .tag-list');
    const tagItems = tagList.querySelectorAll('.tag-pill');

    expect(tagItems.length).toBe(3);

    expect(tagItems[0].textContent.trim()).toBe('tag1');
    expect(tagItems[1].textContent.trim()).toBe('tag2');
    expect(tagItems[2].textContent.trim()).toBe('tag3');
  });

  test('updates sessionStorage with selected tag', async () => {
    const onClickFeed = jest.fn();
    const onClickTag = jest.fn();

    const home = new HomeTagList({ onClickFeed, onClickTag });

    const mockFeedElement = document.createElement('div');
    jest.spyOn(document, 'querySelector').mockReturnValue(mockFeedElement);

    jest
      .spyOn(article_request, 'getTagArticles')
      .mockResolvedValue({ articles: [] });

    const event = {
      preventDefault: jest.fn(),
      target: {
        textContent: 'tag1',
      },
    };

    await home.handleTagClick(event);
    const tagSpy = getSessionStroage('selectTag');

    await updateArticleByTag('tag1', onClickFeed, onClickTag);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(tagSpy).toBe('tag1');

    const HomeFeed = jest.fn();
    HomeFeed({
      activeFeed: 'getTag',
      onClick: onClickFeed,
    });

    expect(HomeFeed).toHaveBeenCalledWith({
      activeFeed: 'getTag',
      onClick: onClickFeed,
    });
  });
});

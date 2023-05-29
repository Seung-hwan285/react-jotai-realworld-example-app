const { tag_request } = require('../../../lib/tag/request');
import HomeTagList from '../HomeTagList';

describe('HomeTagList', () => {
  test('should fetch and return the correct tag list', async () => {
    const mockTagList = { tags: ['tag1', 'tag2'] };
    document.body.innerHTML = `
      <div class="row">
        <div class="col-md-3"></div>
      </div>
    `;

    fetch.mockResponse(JSON.stringify(mockTagList));

    const expectedTags = mockTagList;
    const { tags } = await tag_request.getTagsList();
    expect(expectedTags.tags).toEqual(tags);
  });

  test('render tag list in HomeTagList component', async () => {
    document.body.innerHTML = `
    <div class="row">
      <div class="col-md-3"></div>
    </div>
  `;

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
});

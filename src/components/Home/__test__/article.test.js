import {
  createPageNumberList,
  getNextPageIndex,
} from '../../../lib/article/helper/mainPagination';

describe('HomeArticle', () => {
  test('returns getNextPageIndex', () => {
    expect(getNextPageIndex('<<', 3)).toBe(1);
    expect(getNextPageIndex('>>', 3)).toBe(20);
    expect(getNextPageIndex('<', 5)).toBe(4);
    expect(getNextPageIndex('>', 5)).toBe(6);
    expect(getNextPageIndex(7, 5)).toBe(7);
  });

  test('returns createPageNumberList', () => {
    const symbols1 = ['<<', '<'];
    const symbols2 = ['>', '>>'];

    const expectedPageNumber = [
      ...symbols1,
      ...Array.from({ length: 10 }, (val, idx) => idx + 1),
      ...symbols2,
      ...symbols1,
      ...Array.from({ length: 10 }, (val, idx) => idx + 11),
      ...symbols2,
    ];

    expect(createPageNumberList()).toEqual(expectedPageNumber);
  });
});

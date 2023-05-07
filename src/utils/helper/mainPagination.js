export const domRemove = (domList) => domList.forEach((dom) => dom.remove());

export const getNextPageIndex = (textContent, state) => {
  switch (textContent) {
    case '<<':
      return 1;
    case '<':
      const previousPageIndex = state.activePage - 1;
      if (previousPageIndex > 0) {
        return previousPageIndex;
      } else {
        return '<';
      }
    case '>>':
      return 10;
    case '>':
      const nextPageIndex = state.activePage + 1;
      if (nextPageIndex < 11) {
        return nextPageIndex;
      } else {
        return '>';
      }
    default:
      return Number(textContent);
  }
};

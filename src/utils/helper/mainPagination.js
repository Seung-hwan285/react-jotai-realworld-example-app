export const domRemove = (domList) => domList.forEach((dom) => dom.remove());

export const getNextPageIndex = (textContent, activePage) => {
  switch (textContent) {
    case '<<':
      return 1;
    case '<':
      const previousPageIndex = activePage - 1;
      console.log(previousPageIndex);
      if (previousPageIndex > 0) {
        return previousPageIndex;
      } else {
        return '<';
      }
    case '>>':
      return 20;
    case '>':
      const nextPageIndex = activePage + 1;
      if (nextPageIndex < 27) {
        return nextPageIndex;
      } else {
        return '>';
      }
    default:
      return Number(textContent);
  }
};

const addActive = (dom) => dom.classList.add('active');
const removeActive = (dom) => dom.classList.remove('active');
const hasActive = (dom) => dom.classList.contains('active');
const mainRemove = () => document.querySelector('.main-pagination').remove();

// 새로고침시 tag값이 있어서 계속 태그값에 active 추가
export const createTagNavPillsHtml = (items, authToken, tag) => {
  return items
    .map(({ text }) => {
      const isActive = text === `#${tag}` ? 'active' : '';
      return `
      <li class="nav-item">
        <a class = "nav-link " href="">${text}</a>
      </li>
    `;
    })
    .join('');
};

export const createNavPillsHtml = (items, authToken) => {
  return items.map(({ text }) => {
    const isActive = text === `#${authToken}` ? `active` : '';

    const isActiveTextContent = text === 'Global Feed' && 'active';

    return `
      <li class="nav-item">
        <a class="nav-link ${
          isActive || isActiveTextContent
        }" href="">${text}</a>
      </li>
    `;
  });
};

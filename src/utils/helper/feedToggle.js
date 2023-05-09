export const createTagNavPillsHtml = (items) => {
  return items
    .map(({ text }) => {
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

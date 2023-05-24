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

function HomeArticleTagList(tagList) {
  return /* HTML */ `
    <ul class="tag-list">
      ${tagList
        .map((tag) => {
          return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
        })
        .join('')}
    </ul>
  `;
}

export default HomeArticleTagList;

export const getPageItems = () =>
  Array.from(document.querySelectorAll('.page-item'));

export const getActivePageItem = () =>
  getPageItems().findIndex((item) => item.classList.contains('active'));

export const articlesRemove = (article) => article.forEach((a) => a.remove());

export const getArticlePreviews = () =>
  document.querySelectorAll('.article-preview');

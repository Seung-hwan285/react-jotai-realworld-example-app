import { appendChildrenToParent, createElement } from './index.js';

function SingleContent({ article }) {
  const page = createElement('div', 'container page');

  const render = () => {
    const singleContainerElement = document.querySelector('.article-page');

    page.innerHTML = /* HTML */ ` <div class="row article-content">
      <div class="col-md-12">
        <h2 id="introducing-ionic">${article.title}</h2>
        <p>${article.body}</p>
      </div>

      <ul class="tag-list">
        ${article.tagList &&
        article.tagList
          .map((tag) => {
            return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
          })
          .join('')}
      </ul>
    </div>`;

    appendChildrenToParent(singleContainerElement, page);
  };

  render();
}
export default SingleContent;

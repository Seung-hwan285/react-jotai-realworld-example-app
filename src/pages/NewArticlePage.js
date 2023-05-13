import { cleanHTML } from '../utils/helper/cleanHTML.js';
import NewArticleForm from '../components/NewArticle/NewArticleForm.js';
import { appendChildrenToParent, createElement } from '../utils/helper/dom.js';

function renderNewArticle(target) {
  const newArticleContainer = createElement('div', 'editor-page');
  const newArticleWrapper = createElement('div', 'container page');
  const newArticleRow = createElement('div', 'row');
  const newArticleCol = createElement('div', 'col-md-10 offset-md-1 col-xs-1');

  appendChildrenToParent(newArticleRow, newArticleCol);
  appendChildrenToParent(newArticleWrapper, newArticleRow);
  appendChildrenToParent(newArticleContainer, newArticleWrapper);
  appendChildrenToParent(target, newArticleContainer);
}

function NewArticlePage(target) {
  renderNewArticle(target);

  const render = () => {
    cleanHTML.CreateArticlePage();
    NewArticleForm();
  };

  render();
}
export default NewArticlePage;

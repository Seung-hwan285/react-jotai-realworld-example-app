import { cleanHTML } from '../utils/helper/cleanHTML.js';
import NewArticleForm from '../components/NewArticle/NewArticleForm.js';

function NewArticlePage(target) {
  const createArticleContainer = document.createElement('div');
  createArticleContainer.className = 'editor-page';

  const createArticleWrapper = document.createElement('div');
  createArticleWrapper.className = 'container page';

  const createArticleRow = document.createElement('div');
  createArticleRow.className = 'row';

  const createArticleCol = document.createElement('div');
  createArticleCol.className = 'col-md-10 offset-md-1 col-xs-1';

  createArticleRow.appendChild(createArticleCol);
  createArticleWrapper.appendChild(createArticleRow);
  createArticleContainer.appendChild(createArticleWrapper);
  target.appendChild(createArticleContainer);

  const render = () => {
    cleanHTML.CreateArticlePage();
    const col = document.querySelector('.offset-md-1');

    NewArticleForm(col);
  };

  render();
}
export default NewArticlePage;

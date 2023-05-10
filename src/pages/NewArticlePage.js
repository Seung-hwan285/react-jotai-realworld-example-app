import { cleanHTML } from '../utils/helper/cleanHTML.js';
import NewArticleForm from '../components/NewArticle/NewArticleForm.js';

function NewArticlePage(target) {
  const newArticleContainer = document.createElement('div');
  newArticleContainer.className = 'editor-page';

  const newArticleWrapper = document.createElement('div');
  newArticleWrapper.className = 'container page';

  const newArticleRow = document.createElement('div');
  newArticleRow.className = 'row';

  const newArticleCol = document.createElement('div');
  newArticleCol.className = 'col-md-10 offset-md-1 col-xs-1';

  newArticleRow.appendChild(newArticleCol);
  newArticleWrapper.appendChild(newArticleRow);
  newArticleContainer.appendChild(newArticleWrapper);
  target.appendChild(newArticleContainer);

  const render = () => {
    cleanHTML.CreateArticlePage();
    NewArticleForm();
  };

  render();
}
export default NewArticlePage;

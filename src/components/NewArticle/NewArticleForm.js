import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';

function NewArticleForm() {
  const col = document.querySelector('.offset-md-1');

  const newArticleBox = createElement('form', 'form');
  appendChildrenToParent(col, newArticleBox);

  const initialState = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  const updateState = (key, value) => {
    state[key] = value;
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      ...state,
      authToken: getLocalStroage('token'),
    };

    const data = article_request.createArticle(articleData);

    if (data) {
      route('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const handleTagSubmit = (e) => {
    if (e.key === 'Enter') {
      updateState('tagList', [...state.tagList, e.target.value]);

      const tagList = document.querySelector('.tag-list');

      tagList.innerHTML = state.tagList
        .map((tag) => `<span class="tag-pill tag-default">>${tag}</span>`)
        .join('');
    }
  };

  const render = () => {
    newArticleBox.innerHTML = `
              <fieldset>
            <fieldset class="form-group">
              <input name="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
            </fieldset>
            <fieldset class="form-group">
              <input name="description" type="text" class="form-control" placeholder="What's this article about?" />
            </fieldset>
            <fieldset class="form-group">
              <textarea
              name ="body"
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input id="tag" name="tag" type="text" class="form-control" placeholder="Enter tags" />
              <div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button">
              Publish Article
            </button>
          </fieldset>
        `;

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('change', handleChange);
    });

    const tag = document.querySelector('#tag');
    tag.addEventListener('keyup', handleTagSubmit);

    const form = document.querySelector('.btn');
    form.addEventListener('click', handleArticleSubmit);
  };
  const state = initialState;
  render();
}
export default NewArticleForm;

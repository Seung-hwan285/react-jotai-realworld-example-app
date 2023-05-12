import { article_request } from '../../lib/article/request.js';
import { getLocalStroage } from '../../utils/storage.js';
import { route } from '../../utils/routes.js';
import {
  appendChildrenToParent,
  createElement,
} from '../../utils/helper/dom.js';
import {
  buttonNewArticle,
  createInputFields,
} from '../../utils/helper/authForm.js';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateState(name, value);
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
    const items = [
      {
        placeholder: 'Article Title',
        name: 'title',
        type: 'text',
        className: 'form-control form-control-lg',
      },
      {
        placeholder: 'What`s this article about?',
        name: 'description',
        type: 'text',
        className: 'form-control',
      },
      {
        placeholder: 'Write your article (in markdown)',
        name: 'body',
        className: 'form-control',
        rows: '8',
      },
      {
        placeholder: 'Enter tags',
        name: 'tag',
        id: 'tag',
        type: 'text',
        className: 'form-control',
      },
    ];

    const getInputFiled = createInputFields(items);
    newArticleBox.innerHTML = getInputFiled + buttonNewArticle;

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

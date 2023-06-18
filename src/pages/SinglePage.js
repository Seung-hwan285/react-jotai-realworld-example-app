import LoadingSpinner from '../commons/LoadingSpinner.js';

import {
  appendChildrenToParent,
  article_request,
  cleanHTML,
  comment_request,
  createElement,
  fetchAuthUserInfo,
  getLocalStroage,
  SingleBanner,
  SingleComment,
  SingleContent,
} from './index.js';

function renderSingle(target) {
  const singleContainer = createElement('div', 'article-page');
  const singleBanner = createElement('div', 'banner');
  const container = createElement('div', 'container article');

  appendChildrenToParent(singleBanner, container);
  appendChildrenToParent(singleContainer, singleBanner);
  appendChildrenToParent(target, singleContainer);
}

function SinglePage(target) {
  cleanHTML.SinglePage();

  const spinner = LoadingSpinner();
  target.appendChild(spinner);
  const render = async () => {
    const { pathname } = window.location;
    const token = getLocalStroage('token');

    const userPromise = article_request.getSingleArticle(
      pathname.split('/')[2]
    );
    const userCommentPromise = comment_request.getComments(
      pathname.split('/')[2]
    );
    const authTokenPromise = fetchAuthUserInfo(token);

    const [user, comment, authToken] = await Promise.all([
      userPromise,
      userCommentPromise,
      authTokenPromise,
    ]);
    renderSingle(target);

    updateState({
      user: user,
      comment: comment,
      token: authToken,
    });

    SingleBanner(state);
    SingleContent(state.user);
    SingleComment(state);

    target.removeChild(spinner);
  };

  render();
}

const initialState = {
  user: {},
  comment: {},
  token: '',
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;

export default SinglePage;

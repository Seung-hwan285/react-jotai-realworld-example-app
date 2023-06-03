import { appendChildrenToParent, createElement } from '../utils/dom.js';
import { cleanHTML } from '../utils/cleanHTML.js';
import SingleBanner from '../components/Single/SingleBanner.js';
import SingleContent from '../components/Single/SingleContent.js';
import SingleComment from '../components/Single/SingleComment.js';
import { article_request } from '../lib/article/request.js';
import { comment_request } from '../lib/comment/request.js';
import { fetchAuthUserInfo } from '../lib/auth/helper/fetchAuth.js';
import { getLocalStroage } from '../utils/storage.js';

// username이 똑같지 않으면 삭제 버튼이 사라지게
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
  renderSingle(target);

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

    updateState({
      user: user,
      comment: comment,
      token: authToken,
    });

    SingleBanner(state.user);
    SingleContent(state.user);
    SingleComment(state);
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

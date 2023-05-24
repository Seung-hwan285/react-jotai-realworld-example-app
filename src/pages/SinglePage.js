import { appendChildrenToParent, createElement } from '../utils/dom.js';
import { cleanHTML } from '../utils/cleanHTML.js';
import SingleBanner from '../components/Single/SingleBanner.js';
import SingleContent from '../components/Single/SingleContent.js';
import SingleComment from '../components/Single/SingleComment.js';
import { article_request } from '../lib/article/request.js';
import { comment_request } from '../lib/comment/request.js';

function SinglePage(target) {
  cleanHTML.SinglePage();

  const singleContainer = createElement('div', 'article-page');
  const singleBanner = createElement('div', 'banner');
  const container = createElement('div', 'container article');

  appendChildrenToParent(singleBanner, container);
  appendChildrenToParent(singleContainer, singleBanner);
  appendChildrenToParent(target, singleContainer);

  const render = async () => {
    const { pathname } = window.location;
    const user = await article_request.getSingleArticle(pathname.split('/')[2]);
    const comment = await comment_request.getComments(pathname.split('/')[2]);

    updateState({
      user: user,
      comment: comment,
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
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;

export default SinglePage;

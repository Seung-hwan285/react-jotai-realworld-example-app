import LoginForm from '../components/Login/LoginForm.js';
import LoginFormTitle from '../components/Login/LoginFormTitle.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';
import { appendChildrenToParent, createElement } from '../utils/helper/dom.js';

function renderLogin(target) {
  const loginContainer = createElement('div', 'auth-page');
  const loginWrapper = createElement('div', 'container page');
  const loginRow = createElement('div', 'row');
  const loginCol = createElement('div', 'col-md-6 offset-md-3 col-xs-12');
  const container = document.querySelector('.auth-page');

  if (container) {
    return;
  }

  appendChildrenToParent(loginRow, loginCol);
  appendChildrenToParent(loginWrapper, loginRow);
  appendChildrenToParent(loginContainer, loginWrapper);
  appendChildrenToParent(target, loginContainer);
}

function LoginPage(target) {
  cleanHTML.LoginPage();

  renderLogin(target);

  const render = () => {
    LoginFormTitle();
    LoginForm();
  };

  render();
}
export default LoginPage;

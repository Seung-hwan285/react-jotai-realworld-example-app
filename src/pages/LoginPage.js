import LoginForm from '../components/Login/LoginForm.js';
import LoginFormTitle from '../components/Login/LoginFormTitle.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';

function renderLogin(target) {
  const loginContainer = document.createElement('div');
  loginContainer.className = 'auth-page';

  const loginWrapper = document.createElement('div');
  loginWrapper.className = 'container page';

  const loginRow = document.createElement('div');
  loginRow.className = 'row';

  const loginCol = document.createElement('div');
  loginCol.className = 'col-md-6 offset-md-3 col-xs-12';

  const container = document.querySelector('.auth-page');
  if (container) {
    return;
  }

  loginRow.appendChild(loginCol);
  loginWrapper.appendChild(loginRow);
  loginContainer.appendChild(loginWrapper);

  target.appendChild(loginContainer);
}

function LoginPage(target) {
  cleanHTML.LoginPage();

  renderLogin(target);
  const loginCol = document.querySelector('.offset-md-3');

  const render = () => {
    LoginFormTitle(loginCol);
    LoginForm(loginCol);
  };

  render();
}
export default LoginPage;

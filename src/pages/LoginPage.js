import LoginForm from '../components/Login/LoginForm.js';
import LoginFormTitle from '../components/Login/LoginFormTitle.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';

function LoginPage(target) {
  cleanHTML.LoginPage();

  const LoginContainer = document.createElement('div');
  LoginContainer.className = 'auth-page';

  const LoginWrapper = document.createElement('div');
  LoginWrapper.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-6 offset-md-3 col-xs-12';

  const container = document.querySelector('.auth-page');
  if (container) {
    return;
  }

  row.appendChild(col);
  LoginWrapper.appendChild(row);
  LoginContainer.appendChild(LoginWrapper);

  target.appendChild(LoginContainer);

  const render = () => {
    LoginFormTitle(col);
    LoginForm(col);
  };

  render();
}
export default LoginPage;

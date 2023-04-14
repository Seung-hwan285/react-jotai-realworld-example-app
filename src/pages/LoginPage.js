import LoginForm from '../component/Login/LoginForm.js';
import LoginFormTitle from '../component/Login/LoginFormTitle.js';
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

  // register에서 로그인 페이지로 이동하면 Register가 렌더링 되는게 아니고 Login이 새로 추가된다.

  const render = () => {
    LoginFormTitle(col);
    LoginForm(col);
  };

  render();
}
export default LoginPage;

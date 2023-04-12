import LoginForm from '../component/Login/LoginForm.js';
import LoginFormTitle from '../component/Login/LoginFormTitle.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';

function LoginPage(target) {
  const LoginContainer = document.createElement('div');
  LoginContainer.className = 'Login__Container';

  const container = document.querySelector('.Login__Container');
  if (container) {
    return;
  }

  const LoginWrapper = document.createElement('div');
  LoginWrapper.className = 'Login__Wrapper';

  const LoginFormBox = document.createElement('div');
  LoginFormBox.className = 'Login__Box';

  LoginContainer.appendChild(LoginWrapper);
  LoginContainer.appendChild(LoginFormBox);

  target;
  target.appendChild(LoginContainer);

  // register에서 로그인 페이지로 이동하면 Register가 렌더링 되는게 아니고 Login이 새로 추가된다.

  const render = () => {
    cleanHTML.LoginPage();
    LoginFormTitle(LoginWrapper);
    LoginForm(LoginFormBox);
  };

  render();
}
export default LoginPage;

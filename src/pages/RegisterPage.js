import { cleanHTML } from '../utils/helper/cleanHTML.js';
import RegisterForm from '../components/Register/RegisterForm.js';
import RegisterFormTitle from '../components/Register/RegisterFormTitle.js';

function RegisterPage(target) {
  cleanHTML.RegisterPage();

  const registerContainer = document.createElement('div');
  registerContainer.className = 'auth-page';

  const registerWrapper = document.createElement('div');
  registerWrapper.className = 'container page';

  const registerRow = document.createElement('div');
  registerRow.className = 'row';

  const registerCol = document.createElement('div');
  registerCol.className = 'col-md-6 offset-md-3 col-xs-12';

  const container = document.querySelector('.auth-page');

  if (container) {
    return;
  }

  registerRow.appendChild(registerCol);
  registerWrapper.appendChild(registerRow);
  registerContainer.appendChild(registerWrapper);

  target.appendChild(registerContainer);

  const render = () => {
    RegisterFormTitle(registerCol);
    RegisterForm(registerCol);
  };
  render();
}
export default RegisterPage;

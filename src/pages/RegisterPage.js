import { cleanHTML } from '../utils/helper/cleanHTML.js';
import RegisterForm from '../component/Register/RegisterForm.js';
import RegisterFormTitle from '../component/Register/RegisterFormTitle.js';

function RegisterPage(target) {
  cleanHTML.RegisterPage();

  const RegisterContainer = document.createElement('div');
  RegisterContainer.className = 'auth-page';

  const RegisterWrapper = document.createElement('div');
  RegisterWrapper.className = 'container page';

  const row = document.createElement('div');
  row.className = 'row';

  const col = document.createElement('div');
  col.className = 'col-md-6 offset-md-3 col-xs-12';

  const container = document.querySelector('.auth-page');

  if (container) {
    return;
  }

  row.appendChild(col);
  RegisterWrapper.appendChild(row);
  RegisterContainer.appendChild(RegisterWrapper);

  target.appendChild(RegisterContainer);

  const render = () => {
    RegisterFormTitle(col);
    RegisterForm(col);
  };
  render();
}
export default RegisterPage;

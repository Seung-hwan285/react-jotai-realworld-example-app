import { cleanHTML } from '../utils/helper/cleanHTML.js';
import RegisterForm from '../component/Register/RegisterForm.js';
import RegisterFormTitle from '../component/Register/RegisterFormTitle.js';

function RegisterPage(target) {
  const RegisterContainer = document.createElement('div');
  RegisterContainer.className = 'Register__Container';

  const container = document.querySelector('.Register__Container');

  if (container) {
    return;
  }

  const RegisterWrapper = document.createElement('div');
  RegisterWrapper.className = 'Register__Wrapper';

  const RegisterFormBox = document.createElement('div');
  RegisterFormBox.className = 'Register__Box';

  RegisterContainer.appendChild(RegisterWrapper);
  RegisterContainer.appendChild(RegisterFormBox);

  target.appendChild(RegisterContainer);

  const render = () => {
    cleanHTML.RegisterPage();
    RegisterFormTitle(RegisterWrapper);
    RegisterForm(RegisterFormBox);
  };
  render();
}
export default RegisterPage;

import { auth_request } from '../../lib/auth/requeset.js';
import { route } from '../../utils/routes.js';
import Input from '../../common/Input.js';

function RegisterForm(RegisterFormBox) {
  const handleRegisterSubmit = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.querySelector('.username').value;
      const email = document.querySelector('.email').value;
      const password = document.querySelector('.password').value;

      const user = auth_request.userRegister(username, email, password);

      if (user) {
        route('/');
      }
    });
  };

  const render = () => {
    RegisterFormBox.innerHTML = `
                    <form class="form">
                            <div class="register-box">
                             ${Input({
                               placeholder: 'Username',
                               type: 'text',
                               className: 'username',
                             })}
                             ${Input({
                               placeholder: 'Email',
                               type: 'text',
                               className: 'email',
                             })}
                             ${Input({
                               placeholder: 'Password',
                               type: 'password',
                               className: 'password',
                             })}     
                            </div>
                            
                            <button class="form-button" type="submit">Sign up</button>
                        </form>
                    `;
    handleRegisterSubmit();
  };
  render();
}
export default RegisterForm;

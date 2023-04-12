import { route } from '../../utils/routes.js';
import { setLocalStroage } from '../../utils/storage.js';
import { auth_request } from '../../lib/auth/requeset.js';
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';

function LoginForm(LoginFormBox) {
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    const token = await auth_request.userLogin(email, password);
    setLocalStroage('token', token);
    if (token) {
      route('/');
    }
  };

  const render = () => {
    LoginFormBox.innerHTML = `
                    <form class="form">
                        <div class="sign-in-box">
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
                    
                        ${Button({
                          className: 'form-button',
                          type: 'submit',
                          text: 'Sign in',
                        })};
                </form>
            `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUserSubmit);
  };

  render();
}
export default LoginForm;

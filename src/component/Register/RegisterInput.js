import { auth_request } from '../../lib/auth/requeset.js';
import { route } from '../../utils/routes.js';

function RegisterInput(RegisterFormBox) {
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
                                <input  class="username" type="text" placeholder="username">
                                <input  class="email" type="text" placeholder="Email">
                                <input  class="password" type="text" placeholder="Password">       
                            </div>
                            
                            <button class="form-button" type="submit">Sign up</button>
                        </form>
                    `;
    handleRegisterSubmit();
  };
  render();
}
export default RegisterInput;

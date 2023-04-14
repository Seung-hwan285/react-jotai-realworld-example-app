function RegisterFormTitle(RegisterWrapper) {
  const render = () => {
    RegisterWrapper.innerHTML = `
         <h2 class="text-xs-center">Sign up</h2>
         <p class="text-xs-center">
          <a href="">Have an account?</a>
        </p>
        `;
  };
  render();
}

export default RegisterFormTitle;

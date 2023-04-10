function RegisterFormTitle(RegisterWrapper) {
  const render = () => {
    RegisterWrapper.innerHTML = `
                <div class="register-in-title">
                <h2>Sign Up</h2>
                <p>Need an account?</p>
                </div>
            `;
  };
  render();
}

export default RegisterFormTitle;

function LoginFormTitle(col) {
  const render = () => {
    col.innerHTML = /* HTML */ `
      <h2 class="text-xs-center">Sign in</h2>
      <p class="text-xs-center">
        <a href="">Need an account?</a>
      </p>
    `;
  };
  render();
}
export default LoginFormTitle;
function LoginTitle() {
  const col = document.querySelector('.offset-md-3');

  return (col.innerHTML = /* HTML */ `
    <h2 class="text-xs-center">Sign in</h2>
    <p class="text-xs-center">
      <a href="">Need an account?</a>
    </p>
  `);
}
export default LoginTitle;

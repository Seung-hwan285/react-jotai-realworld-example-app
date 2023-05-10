function RegisterFormTitle() {
  const col = document.querySelector('.offset-md-3 ');

  return (col.innerHTML = /* HTML */ `
    <h2 class="text-xs-center">Sign up</h2>
    <p class="text-xs-center">
      <a href="">Have an account?</a>
    </p>
  `);
}

export default RegisterFormTitle;

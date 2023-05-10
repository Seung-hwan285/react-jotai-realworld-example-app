function SettingFormTitle() {
  const col = document.querySelector('.offset-md-3');

  return (col.innerHTML = /* HTML */ `
    <h1 class="text-xs-center">Your Settings</h1>
  `);
}

export default SettingFormTitle;

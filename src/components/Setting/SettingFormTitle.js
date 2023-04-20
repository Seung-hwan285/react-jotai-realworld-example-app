function SettingFormTitle(col) {
  const render = () => {
    col.innerHTML = /* HTML */ `
      <h1 class="text-xs-center">Your Settings</h1>
    `;
  };
  render();
}

export default SettingFormTitle;

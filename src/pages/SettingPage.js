function SettingPage(target) {
  const container = document.querySelector('.Setting__Container');
  if (container) {
    return;
  }
  const SettingContainer = document.createElement('div');
  SettingContainer.className = 'Setting__Container';

  const SettingWrapper = document.createElement('div');
  SettingWrapper.className = 'Setting__Wrapper';
  SettingWrapper.innerHTML = `ㅇㅁㄴ`;

  SettingContainer.appendChild(SettingWrapper);

  target.appendChild(SettingContainer);

  const render = () => {
    // setting 페이지가 렌더링 되면 Banner 돔이 제거되어야한다.

    const Banner = document.querySelector('.Banner__Container');

    console.log(Banner);
    if (Banner) {
      // setTimeout을 사용하여 Setting__Container가 렌더링된 후에 Banner 요소를 제거합니다.
      setTimeout(() => {
        Banner.innerHTML = '';
        Banner.remove();
      }, 0);
    }
  };

  render();
}
export default SettingPage;

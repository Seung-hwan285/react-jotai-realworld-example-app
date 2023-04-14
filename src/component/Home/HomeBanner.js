function HomeBanner(HomeWrapper) {
  const render = () => {
    HomeWrapper.innerHTML = `
              <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
        `;
  };
  render();
}
export default HomeBanner;

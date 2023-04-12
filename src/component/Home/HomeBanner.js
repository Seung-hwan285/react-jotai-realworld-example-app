function HomeBanner(HomeWrapper) {
  const render = () => {
    HomeWrapper.innerHTML = `
                <h1 class="banner-title">conduit</h1>
                <p class="banner-content">A place to share your hnwledge.</p>
        `;
  };
  render();
}
export default HomeBanner;

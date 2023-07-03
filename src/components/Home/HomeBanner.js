function HomeBanner() {
  const bannerWrapper = document.querySelector('.banner .container');

  // test
  return (bannerWrapper.innerHTML = /* HTML */ `
    <h1 class="logo-font">conduit</h1>
    <p>A place to share your knowledge.</p>
  `);
}
export default HomeBanner;

import { createElement } from '../utils/dom.js';

function Footer(target) {
  const footer = createElement('footer', '');

  const render = () => {
    footer.innerHTML = /* HTML */ `
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    `;
  };

  target.appendChild(footer);
  render();

  return { render };
}
export default Footer;

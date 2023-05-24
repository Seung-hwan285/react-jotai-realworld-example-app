import { createElement } from '../utils/dom.js';

function Input({ name, value, placeholder, id, type, className }) {
  const tagList = id === 'tag' && createElement('div', 'tag-list');

  return /* HTML */ `
    <input
      name="${name}"
      class="${className}"
      id="${id}"
      type="${type}"
      value="${value === undefined ? '' : value}"
      placeholder="${placeholder}"
    />

    ${tagList ? tagList.outerHTML : ''}
  `;
}
export default Input;

function Input({ name, value, placeholder, id, type, className }) {
  return /* HTML */ `
    <input
      name="${name}"
      class="${className}"
      id="${id}"
      type="${type}"
      value="${value === undefined ? '' : value}"
      placeholder="${placeholder}"
      role="textbox"
    />
  `;
}
export default Input;

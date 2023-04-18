function Button({ className, type, text }) {
  return /* HTML */ `
    <button class="${className}" type="${type}">${text}</button>
  `;
}
export default Button;

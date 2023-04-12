function Button({ className, type, text }) {
  return `
        <button class="${className}" type="${type}">${text}</button>
    `;
}
export default Button;

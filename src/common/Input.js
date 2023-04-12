function Input({ value, placeholder, type, className }) {
  console.log(value);
  console.log(className);
  return `
        <div class=input-container>
            <input class="${className}" type="${type}" value="${
    value === undefined ? '' : value
  }" placeholder="${placeholder}"/>
        </div>
    `;
}
export default Input;

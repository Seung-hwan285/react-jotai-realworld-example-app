function Input({ value, placeholder, id, type, className }) {
  return `
        
            <input class="${className}" id="${id}" type="${type}" value="${
    value === undefined ? '' : value
  }" placeholder="${placeholder}"/>
     
    `;
}
export default Input;

import Input from '../../common/Input.js';
import Button from '../../common/Button.js';

export const inputFileds = (inputs) => {
  return inputs
    .map(({ placeholder, type, id, className }) => {
      return /* HTML */ `
        <fieldset class="form-group">
          ${Input({
            placeholder,
            type,
            id,
            className,
          })}
        </fieldset>
      `;
    })
    .join('');
};

export const navbarItems = (items, authToken) => {
  return items.map(({ text, link }) => {
    return /* HTML */ `
      <li class="nav-item">
        <a
          class="nav-link ${text === 'Home' ? 'active' : ''}"
          data-link="${link}"
        >
          ${authToken && text === 'New Article'
            ? '<i class="ion-compose"></i>'
            : ''}
          ${authToken && text === 'Settings'
            ? '<i class="ion-gear-a"></i>'
            : ''}
          ${text}
        </a>
      </li>
    `;
  });
};

export const buttonLogin = Button({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Sign in',
});

export const buttonRegister = Button({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Sign up',
});

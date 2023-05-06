import Input from '../../commons/Input.js';
import Button from '../../commons/Button.js';

export const inputFileds = (inputs) => {
  return inputs
    .map(({ placeholder, name, type, id, className, rows }) => {
      if (!rows) {
        return /* HTML */ `
          <fieldset class="form-group">
            ${Input({
              placeholder,
              name,
              type,
              id,
              className,
            })}
          </fieldset>
        `;
      } else {
        return /* HTML */ `
          <fieldset class="form-group">
            <textarea
              class="${className}"
              rows="${rows}"
              placeholder="${placeholder}"
            >
            </textarea>
          </fieldset>
        `;
      }
    })
    .join('');
};

export const createNavbarHtml = (items, authToken) => {
  return items
    .map(({ text, link }) => {
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
    })
    .join('');
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

export const buttonSetting = Button({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Update Settings',
});

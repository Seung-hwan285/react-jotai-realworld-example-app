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

export const button = Button({
  className: 'btn btn-lg btn-primary pull-xs-right',
  type: 'submit',
  text: 'Sign in',
});

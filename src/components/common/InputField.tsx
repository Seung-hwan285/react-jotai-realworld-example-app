import React from 'react';
import { PropsInputField } from '../../lib/utils/type/auth';

function InputField({
  type,
  placeholder,
  name,
  value,
  onChange,
  onKeyPress,
}: PropsInputField) {
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </fieldset>
  );
}
export default InputField;

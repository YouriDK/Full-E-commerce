import { FC } from 'react';
interface InputProps {
  name: string;
  type?: string | 'text';
  change: Function;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  textarea?: boolean;
  variable: any;
}
const CustomInput: FC<InputProps> = ({
  name,
  variable,
  label,
  type,
  change,
  placeholder,
  textarea,
}): JSX.Element => {
  return textarea ? (
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <textarea
        value={variable}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
      ></textarea>
    </div>
  ) : (
    <div>
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>
      <input
        value={variable}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        onChange={(e) => change(e.target.value)}
      ></input>
    </div>
  );
};
export default CustomInput;

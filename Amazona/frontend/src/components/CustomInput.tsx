import { FC } from 'react';
interface InputProps {
  name: string;
  type?: string;
  change: Function;
  label: string;
  disabled?: boolean;
  textarea?: boolean;
  variable: any;
}
const CustomInput: FC<InputProps> = ({
  name,
  variable,
  label,
  type = 'text',
  change,
  textarea,
}): JSX.Element => {
  return textarea ? (
    <div>
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>
      <textarea
        value={variable}
        name={name}
        id={name}
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
        id={name}
        onChange={(e) => change(e.target.value)}
      ></input>
    </div>
  );
};
export default CustomInput;

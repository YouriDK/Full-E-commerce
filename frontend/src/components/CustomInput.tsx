import { FC } from 'react';
interface InputProps {
  name: string;
  type?: string | 'text';
  change: Function;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  textarea?: boolean;
  variable?: any;
  required?: boolean;
  checked?: boolean;
  options?: string[];
}
const CustomInput: FC<InputProps> = ({
  required,
  checked,
  name,
  variable,
  label,
  type,
  change,
  placeholder,
  options,
  textarea,
}): JSX.Element => {
  return textarea ? (
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <textarea
        required={required}
        value={variable}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
      ></textarea>
    </div>
  ) : type === 'file' ? (
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <input
        required={required}
        checked={checked}
        className='font-secondary bold'
        type={type}
        name={name}
        id={name}
        onChange={(e) =>
          change(e.target.files ? e.target.files[0].name : e.target.files)
        }
      ></input>
    </div>
  ) : type === 'select' ? (
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <select
        required={required}
        className='font-secondary bold'
        name={name}
        value={variable}
        id={name}
        onChange={(e: any) => change(e.target.value)}
      >
        {options?.map((op: string) => (
          <option value={op} key={op} selected={variable === op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <input
        required={required}
        checked={checked}
        className='font-secondary bold'
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

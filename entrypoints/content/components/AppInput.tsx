import { memo } from "react";
import classNames from 'classnames';
import { RegisterOptions, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: 'number';
  required?: boolean;
  className?: string;
}

export const AppInput = memo(({ name, label, className, type, required }: Props) => {
  const {register} = useFormContext();
  const options = useMemo((): RegisterOptions => ({
    required,
    valueAsNumber: type === 'number',
  }), [required, type])
  return (
    <div className={classNames("form-floating", className)}>
      <input className="form-control" id={name} placeholder="" {...register(name, options)}/>
      <label htmlFor={name}>{label}</label>
    </div>
  );
});
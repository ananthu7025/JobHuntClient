import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type InputCircularRadioProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label?: string;
  errorText?: string;
  labelMandatory?: boolean;
  options: { label: string; value: string }[];
  radioClassName?: string;
  onChange?: (value: string) => void;
};

const InputCircularRadio = <T extends FieldValues>({
  hookForm,
  field,
  options,
  radioClassName = "form-check form-check-inline",
  onChange,
}: InputCircularRadioProps<T>) => {
  const { setValue, register, watch } = hookForm;

  return (
    <div className="selectradio">
      <div className="selectradiocol">
        <div className="selectradioitem">
          {options.map((item, ind) => (
            <div className={radioClassName} key={ind}>
              <input
                className="form-check-input"
                type="radio"
                id={`${field}-${ind}`}
                checked={watch(field) === item.value}
                value={item.value}
                name={register(field).name}
                  onChange={(e) => {
                  const newValue = e.target.value;
                  setValue(field, newValue as PathValue<T, Path<T>>);
                  onChange?.(newValue); 
                }}
              />
              <label className="form-check-label" htmlFor={`${field}-${ind}`}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputCircularRadio;

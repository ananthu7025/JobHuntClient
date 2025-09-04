/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { SelectItem } from "@/types";
import { isError } from "@/utils/helper";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputSelectProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  options: SelectItem[];
  placeholder: string;
  labelMandatory?: boolean;
  isMuliple?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  onChangeHandle?: (data: SelectItem) => void;
  customClass?:string;
};

const InputDropDown = <T extends FieldValues>({
  hookForm,
  field,
  label,
  options,
  placeholder,
  labelMandatory,
  isMuliple,
  isDisabled,
  isClearable,
  onChangeHandle,
  customClass,
  errorText
}: InputSelectProps<T>) => {
  const {
    register,
    control,
    formState: { errors },
  } = hookForm;
  const error = errors[field];

  const displayError = error
    ? errorText && errorText?.trim() !== ""
      ? errorText
      : (error.message as string)
    : null;

  return (
    <>
      <div className={`customDropdown ${isMuliple ? "multiDropdown" : ""}`}>
        <label className="form-control-label ss">
          {label}
          <span className="text-danger">
            {labelMandatory ? "*" : ""}
          </span>
        </label>
        <Controller
          name={register(field).name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              options={options}
              onChange={(data) => {
                onChange(data);
                if (onChangeHandle) onChangeHandle(data);
              }}
              placeholder={placeholder}
              classNamePrefix="custom-select"
              className={`${isError(errors, field) ? "validate-field" : ""} ${customClass}`}
              isClearable={isClearable}
              value={(value as any) || ""}
              isMulti={isMuliple}
              isDisabled={isDisabled}
              ref={ref}
              // styles={isMuliple ? customStyles : undefined}
            />
          )}
        />
         {displayError && <p className="error-msg">{displayError}</p>}
      </div>
    </>
  );
};

export default InputDropDown;

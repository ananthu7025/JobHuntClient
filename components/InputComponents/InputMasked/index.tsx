import { isError } from "@/utils/helper";
import ReactInputMask from "react-input-mask";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputMaskedProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  mask?: string;
  placeholder?: string;
  labelMandatory?: boolean;
  disabled?: boolean;
};

const InputMasked = <T extends FieldValues>({
  hookForm,
  label,
  field,
  mask,
  placeholder,
  labelMandatory,
  disabled,
}: InputMaskedProps<T>) => {
  const {
    register,
    formState: { errors },
    control,
  } = hookForm;

  return (
    <>
      <label className="form-control-label">
        {label}
        <span className="text-danger">
          {labelMandatory ? "*" : ""}
        </span>
      </label>
      <Controller
        name={register(field).name}
        control={control}
        render={({ field: { onChange, ref, value } }) => (
          <ReactInputMask
            mask={mask || "999-9999-9999999-9"}
            maskChar="X"
            placeholder={placeholder || "XXX-XXXX-XXXXXXX-X"}
            type="text"
            className={`form-control ${
              isError(errors, field) ? "validate-field" : ""
            }`}
            onChange={onChange}
            inputRef={ref}
            value={value || ""}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};

export default InputMasked;

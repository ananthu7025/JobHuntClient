import { isError } from "@/utils/helper";
import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TextTransformMode = "capitalize" | "uppercase" | "lowercase" | "none";

type InputTextProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  labelMandatory?: boolean;
  infoText?: string;
  showInfoIcon?: boolean;
  textTransformMode?: TextTransformMode;
} & InputHTMLAttributes<HTMLInputElement>;

const InputText = <T extends FieldValues>({
  hookForm,
  field,
  label,
  labelMandatory,
  infoText,
  showInfoIcon,
  textTransformMode = "none",
  errorText,
  ...props
}: InputTextProps<T>) => {
  const {
    register,
    formState: { errors },
  } = hookForm;

  const textTransformHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    switch (textTransformMode) {
      case "capitalize":
        value = value
          .toLowerCase()
          .replace(/(^|\s)(\w)/g, (match, p1, p2) => p1 + p2.toUpperCase());
        break;
      case "uppercase":
        value = value.toUpperCase();
        break;
      case "lowercase":
        value = value.toLowerCase();
        break;
      case "none":
      default:
        break;
    }
    return value;
  };

  const error = errors[field];

  const displayError = error
    ? errorText && errorText?.trim() !== ""
      ? errorText
      : (error.message as string)
    : null;

  return (
    <>
      <label className="me-2 form-control-label infoLabel">
        {label}
        <span className="text-danger">{labelMandatory ? "*" : ""}</span>
        {showInfoIcon && infoText && (
          <div className="infolabelText">
            <i className="icon icon-info" />
            <span>{infoText}</span>
          </div>
        )}
      </label>

      <input
        className={`form-control ${
          isError(errors, field) ? "validate-field" : ""
        }`}
        {...props}
        {...register(field, {
          onChange: (e) => {
            e.target.value = textTransformHandler(e);
          },
        })}
        onBlur={props.onBlur}
      />

      {displayError && <p className="error-msg">{displayError}</p>}
    </>
  );
};

export default InputText;

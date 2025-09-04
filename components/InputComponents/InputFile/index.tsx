/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { isError } from "@/utils/helper";

type InputFileProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  labelMandatory?: boolean;
  infoText?: string;
  showInfoIcon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputFile = <T extends FieldValues>({
  hookForm,
  field,
  label,
  labelMandatory,
  infoText,
  showInfoIcon,
  ...props
}: InputFileProps<T>) => {
  const {
    setValue,
    formState: { errors },
  } = hookForm;
  console.log(errors)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue(field, files[0] as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(field, null as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <>
      <label className="form-label">
        {label}
        {labelMandatory && <span className="text-danger"> *</span>}
        {showInfoIcon && infoText && (
          <div className="infolabelText">
            <i className="icon icon-info" />
            <span>{infoText}</span>
          </div>
        )}
      </label>

      <input
        type="file"
        className={`form-control ${
          isError(errors, field) ? "validate-field" : ""
        }`}
        onChange={handleFileChange}
        {...props}
      />

      {isError(errors, field) && (
        <p className="text-danger">{errors[field]?.message as string}</p>
      )}
    </>
  );
};

export default InputFile;

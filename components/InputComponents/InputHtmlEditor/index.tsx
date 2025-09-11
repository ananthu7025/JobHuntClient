/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import { isError } from "@/utils/helper";
import React, { useEffect } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// custom toolbar configuration for quill editor
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
];

interface HTMLEditorProps<T extends FieldValues> {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  labelMandatory?: boolean;
  disabled?: boolean;
  modules?: any;
  formats?: string[];
}

const InputHTMLEditor = <T extends FieldValues>({
  hookForm,
  label,
  field,
  labelMandatory,
  disabled,
  modules,
  formats,
  errorText,
}: HTMLEditorProps<T>) => {
  const {
    register,
    control,
    formState: { errors },
  } = hookForm;

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .ql-container {
        min-height: 250px;
        font-family: inherit;
      }
      .ql-editor {
        min-height: 250px;
      }
      .ql-editor a {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const error = errors[field];

  const displayError = error
    ? errorText && errorText?.trim() !== ""
      ? errorText
      : (error.message as string)
    : null;
  return (
    <>
      <label className="form-control-label ss">
      {label}<span className="text-danger">{labelMandatory ? "*" : ""}</span>
        <input
          ref={register(field).ref}
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </label>
      <div
        style={{
          pointerEvents: disabled ? "none" : "all",
        }}
        className={`${isError(errors, field) ? "validate-field" : ""}`}
      >
        <Controller
          name={register(field).name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactQuill
              value={value || ""}
              onChange={onChange}
              modules={modules || quillModules}
              formats={formats || quillFormats}
              readOnly={disabled}
              theme="snow"
              placeholder="Enter text..."
            />
          )}
        />
      </div>
      {displayError && <p className="error-msg">{displayError}</p>}

    </>
  );
};

InputHTMLEditor.defaultProps = {
  disabled: false,
  modules: quillModules,
  formats: quillFormats,
};

export default InputHTMLEditor;

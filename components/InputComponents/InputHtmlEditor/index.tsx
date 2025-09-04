/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import { isError } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
  }
);

// custom toolbar configuration for ck editor
const editorConfiguration: EditorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
    ],
  },
};

interface HTMLEditorProps<T extends FieldValues> {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  labelMandatory?: boolean;
  disabled?: boolean;
  config?: EditorConfig;
  
}

const InputHTMLEditor = <T extends FieldValues>({
  hookForm,
  label,
  field,
  labelMandatory,
  disabled,
  config,
  errorText,
}: HTMLEditorProps<T>) => {
  const {
    register,
    control,
    formState: { errors },
  } = hookForm;

  const [Editor, setEditor] = useState<any>(null);

  useEffect(() => {
    import("ckeditor5-custom-build/build/ckeditor")
      .then((module) => setEditor(() => module.default)) // Ensure proper instantiation
      .catch((error) => console.error("Error loading CKEditor:", error));
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .ck-content {
        height: 250px;
      }
      .ck-content a {
        cursor: pointer;
      }
      .ck-powered-by-balloon {
        display: none !important;
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
        {Editor && (
          <Controller
            name={register(field).name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <CKEditor
                  editor={Editor as any}
                  config={config}
                  data={value || ""}
                  onChange={(event, editor) => {
                    const editorData = (editor as any).getData();
                    onChange(editorData || "");
                  }}
                  disabled={disabled}
                  // remove images from pasting
                  onReady={(editor) => {
                    // handle paste event to filter out <img> tags
                    editor.editing.view.document.on(
                      "clipboardInput",
                      (event, datas) => {
                        const clipboardData = datas?.dataTransfer;
                        const pastedHtml = clipboardData?.getData("text/html");

                        if (pastedHtml) {
                          // retrieve pasted HTML
                          let modifiedHtml = pastedHtml;

                          // remove <img> tags from the HTML
                          const parser = new DOMParser();
                          const doc = parser.parseFromString(
                            pastedHtml,
                            "text/html"
                          );
                          const images = doc.querySelectorAll("img");
                          images.forEach((img) => img.remove());

                          modifiedHtml = new XMLSerializer().serializeToString(
                            doc
                          );

                          // convert modified HTML to CKEditor model
                          editor.model.change(() => {
                            const viewFragment =
                              editor.data.processor.toView(modifiedHtml);
                            const modelFragment =
                              editor.data.toModel(viewFragment);
                            editor.model.insertContent(modelFragment);
                          });

                          // prevent the default paste action
                          event.stop();
                        }
                      }
                    );
                  }}
                />
              </>
            )}
          />
        )}
      </div>
      {displayError && <p className="error-msg">{displayError}</p>}

    </>
  );
};

InputHTMLEditor.defaultProps = {
  disabled: false,
  config: editorConfiguration,
};

export default InputHTMLEditor;

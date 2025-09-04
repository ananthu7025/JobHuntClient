/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PhoneInput from "react-phone-input-2";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  FieldValues,
  UseFormReturn,
  Path,
  Controller,
  ControllerRenderProps,
  PathValue,
} from "react-hook-form";
import { isError } from "@/utils/helper";
import { fetchCountries } from "@/store/slices/general";

type InputTextProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  codeField: Path<T>;
  phoneField: Path<T>;
  label: string;
  errorText?: string;
  labelMandatory?: boolean;
};

const InputPhone = <T extends FieldValues>({
  hookForm,
  codeField,
  phoneField,
  label,
  labelMandatory,
  errorText
}: InputTextProps<T>) => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
  } = hookForm;

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.general);

  // allowed countries
  const [alloCount, setAlloCount] = useState<string[]>([]);

  // component
  const PhoneComp = useCallback(
    ({ inField }: { inField: ControllerRenderProps<T, Path<T>> }) => {
      return (
        <PhoneInput
          country={alloCount[0] || "us"}
          value={inField.value || ""}
          onChange={(_v, c, _e, _f) =>
            inField.onChange(`+${(c as any).dialCode}`)
          }
          inputStyle={{
            width: "0px",
            paddingLeft: "0px",
          }}
          containerStyle={{
            width: "auto",
          }}
          onlyCountries={alloCount}
        />
      );
    },
    [alloCount]
  );

  // set allowed countries list
  useEffect(() => {
    const _countries: string[] = [];
    setAlloCount([]);
  }, [countries]);

  // fetch countries not already fetched
  useEffect(() => {
    if (countries.length < 1) {
      dispatch(fetchCountries());
    }
  }, [countries.length, dispatch]);
const error = errors[phoneField];

  const displayError = error
    ? errorText && errorText?.trim() !== ""
      ? errorText
      : (error.message as string)
    : null;
  return (
    <>
      <label className="form-control-label">
        {label}
        <span className= "text-danger">
          {labelMandatory ? "*" : ""}
        </span>
      </label>
      <div className={`d-flex customPhoneNumber`}>
        <Controller
          name={register(codeField).name}
          control={control}
          render={({ field: inField }) => <PhoneComp inField={inField} />}
        />
        <input
          type="text"
          className={`form-control  ${
            isError(errors, phoneField) ? "validate-field" : ""
          }`}
          placeholder="Enter Phone number"
          {...register(phoneField)}
          onChange={(e) => {
            const val = e.target.value;
            const phoneNum = val ? val.replace(/\D/g, "") : val;
            setValue(phoneField, phoneNum as PathValue<T, Path<T>>, {
              shouldValidate: true,
            });
          }}
        />

      </div>
                 {displayError && <p className="error-msg">{displayError}</p>}

    </>
  );
};

export default InputPhone;

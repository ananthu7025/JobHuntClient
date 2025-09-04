/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import InputDropDown from "../InputDropDown";
import { fetchNationalities } from "@/store/slices/general";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputNationalityProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  placeholder: string;
  labelMandatory?: boolean;
};

const InputNationalityArb = <T extends FieldValues>({
  hookForm,
  field,
  label,
  errorText,
  placeholder,
  labelMandatory,
}: InputNationalityProps<T>) => {
  const { nationalities } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
  } = hookForm;

  useEffect(() => {
    if (nationalities.length < 1) {
      dispatch(fetchNationalities());
    }
  }, [nationalities.length, dispatch]);

  const error = errors[field];
  const displayError = error?.message ?? errorText ?? null;

  return (
    <>
      <InputDropDown
        hookForm={hookForm}
        options={nationalities.map((item) => ({
          label: item.nationalityNameArb,
          value: item.nationalityID.toString(),
        }))}
        field={field}
        label={label}
        placeholder={placeholder}
        labelMandatory={labelMandatory}
      />
    </>
  );
};

export default InputNationalityArb;

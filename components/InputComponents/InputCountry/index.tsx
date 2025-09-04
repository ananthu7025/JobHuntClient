import { useEffect } from "react";
import InputDropDown from "../InputDropDown";
import { fetchCountries } from "@/store/slices/general";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { SelectItem } from "@/types";

type InputTextProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  placeholder: string;
  labelMandatory?: boolean;
  onChange?: (data: SelectItem) => void;
};

const InputCountry = <T extends FieldValues>({
  hookForm,
  field,
  label,
  errorText,
  placeholder,
  labelMandatory,
  onChange,
}: InputTextProps<T>) => {
  const { countries } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  // fetch country codes if not already fetched
  useEffect(() => {
    if (countries.length < 1) {
      dispatch(fetchCountries());
    }
  }, [countries.length, dispatch]);

  return (
    <InputDropDown
      hookForm={hookForm}
      options={countries.map((item) => ({
        label: item.countryName,
        value: item.countryID.toString(),
      }))}
      field={field}
      label={label}
      errorText={errorText}
      placeholder={placeholder}
      labelMandatory={labelMandatory}
      onChangeHandle={onChange}
    />
  );
};

export default InputCountry;

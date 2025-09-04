import { useEffect } from "react";
import InputDropDown from "../InputDropDown";
import { fetchCitiesById } from "@/store/slices/general";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type InputTextProps<T extends FieldValues> = {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  errorText?: string;
  placeholder: string;
  labelMandatory?: boolean;
  countryId?: string;
};

const InputCity = <T extends FieldValues>({
  hookForm,
  field,
  label,
  errorText,
  placeholder,
  countryId,
  labelMandatory,
}: InputTextProps<T>) => {
  const { cities } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  // fetch country codes if not already fetched
  useEffect(() => {
    if (countryId) {
      dispatch(fetchCitiesById(+countryId));
    }
  }, [countryId, dispatch]);

  return (
    <InputDropDown
      hookForm={hookForm}
      options={cities.map((item) => ({
        label: item.cityName,
        value: item.cityID.toString(),
      }))}
      field={field}
      label={label}
      errorText={errorText}
      placeholder={placeholder}
      labelMandatory={labelMandatory}
    />
  );
};

export default InputCity;

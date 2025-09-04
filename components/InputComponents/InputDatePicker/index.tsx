import moment from "moment";
import DatePicker from "react-datepicker";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { isError } from "@/utils/helper";

interface DatePickerProps<T extends FieldValues> {
  hookForm: UseFormReturn<T>;
  field: Path<T>;
  label: string;
  labelMandatory?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  errorText?:string;
}

const InputDatePicker = <T extends FieldValues>({
  hookForm,
  field,
  label,
  labelMandatory,
  minDate,
  maxDate,
  showMonthDropdown,
  showYearDropdown,
    errorText

}: DatePickerProps<T>) => {
  const {
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = hookForm;
  const error = errors[field];

  const displayError = error
    ? errorText && errorText?.trim() !== ""
      ? errorText
      : (error.message as string)
    : null;

  return (
    <div className="customDatePicker">
      <label className="form-control-label">
        {label}
        <span className="text-danger">{labelMandatory ? "*" : ""}</span>
      </label>
      <DatePicker
        onChange={(e) => {
          const formattedDate = e ? moment(e).toISOString() : null; 
          setValue(field, formattedDate as PathValue<T, Path<T>>); 
          if (e) {
            clearErrors(field); 
          }
        }}
        value={watch(field) ? moment(watch(field)).format("D-MMM-YYYY") : ""} 
        selected={watch(field) ? new Date(watch(field)) : null} 
        wrapperClassName={`${isError(errors, field) ? "DatePicker-field" : ""}`}
        showYearDropdown={showYearDropdown}
        showMonthDropdown={showMonthDropdown}
        minDate={minDate}
        maxDate={maxDate}
      />
        {displayError && <p className="error-msg">{displayError}</p>}
    </div>
  );
};

export default InputDatePicker;

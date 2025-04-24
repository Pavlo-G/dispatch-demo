import * as React from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";

type ButtonFieldProps = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
} & UseDateFieldProps<Dayjs, false> &
  BaseSingleInputFieldProps<
    Dayjs | null,
    Dayjs,
    FieldSection,
    false,
    DateValidationError
  >;

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
    >
      {label ?? "Pick a date"}
    </Button>
  );
}

type CustomDateTimePickerProps = {
  isDisabled?: boolean;
  onDateChange?: (date: Dayjs | null) => void;
};

export default function CustomDateTimePicker({
  isDisabled = false,
  onDateChange,
}: CustomDateTimePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
        label={value == null ? null : value.format("MMM DD, YYYY")}
        disabled={isDisabled}
        disablePast
        onChange={handleDateChange}
        slots={{ field: ButtonField }}
        slotProps={{
          field: { setOpen } as any,
          nextIconButton: { size: "small" },
          previousIconButton: { size: "small" },
        }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        views={["day", "month", "year", "hours", "minutes"]}
      />
    </LocalizationProvider>
  );
}

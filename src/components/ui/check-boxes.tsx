import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface MultiSelectProps<T> {
  options: T[];
  label: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  onChange?: (value: T[]) => void;
}

export default function MultiSelect<T>({
  options,
  label,
  placeholder = "Selecciona...",
  getOptionLabel,
  onChange,
}: MultiSelectProps<T>) {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      onChange={(_, value) => onChange?.(value)}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
            />
            {getOptionLabel(option)}
          </li>
        );
      }}
      style={{
        width: 500,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
          }}
        />
      )}
    />
  );
}

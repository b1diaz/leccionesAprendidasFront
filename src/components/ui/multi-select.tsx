import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions<any>();

interface MultiSelectProps<T> {
  options: T[];
  label: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  onChange: (value: T[]) => void;
  onClick: () => void;
}

export default function MultiSelect<T>({
  options,
  label,
  placeholder = "Selecciona...",
  getOptionLabel,
  onChange,
  onClick,
}: MultiSelectProps<T>) {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);

        if (params.inputValue !== "") {
          filtered.push({
            title: `➕ Crear nuevo estado "${params.inputValue}"`,
            inputValue: params.inputValue,
            isNew: true,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option: any) => {
        if (option.inputValue) {
          return option.inputValue;
        }
        return getOptionLabel(option);
      }}
      onChange={(event, newValue: any[], reason) => {
        const last = newValue[newValue.length - 1];

        if (reason === "selectOption" && last?.isNew) {
          newValue.pop();
          onClick();
        } else {
          onChange(newValue);
        }
      }}
      renderOption={(props, option: any, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {!option.isNew && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
            )}
            {option.title || getOptionLabel(option)}
          </li>
        );
      }}
      style={{ width: 500 }}
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

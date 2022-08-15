import { Checkbox } from "@trussworks/react-uswds";

type FilterCheckboxProps = {
  name: string;
  value: string;
  label: string;
  selectedFilterValues: string[];
  onChange: () => void;
};

function FilterCheckbox({
  name,
  value,
  label,
  selectedFilterValues,
  onChange,
}: FilterCheckboxProps) {
  return (
    <Checkbox
      id={value}
      name={name}
      label={label}
      checked={selectedFilterValues.includes(value)}
      onChange={onChange}
      value={value}
    />
  );
}

export default FilterCheckbox;

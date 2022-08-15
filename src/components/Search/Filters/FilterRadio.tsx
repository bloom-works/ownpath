import { Radio } from "@trussworks/react-uswds";

type FilterRadioProps = {
  name: string;
  value: string;
  label: string;
  onChange: () => void;
  selected: boolean;
};

function FilterRadio({
  name,
  value,
  label,
  onChange,
  selected,
}: FilterRadioProps) {
  return (
    <Radio
      id={value}
      name={name}
      label={label}
      checked={selected}
      onChange={onChange}
      value={value}
      key={value}
    />
  );
}

export default FilterRadio;

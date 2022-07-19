import { Radio } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

import { Checkbox } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

type FilterCheckboxProps = {
  name: string;
  value: string;
  tPrefix: string;
  selectedFilterValues: string[];
  onChange: () => void;
};

function FilterCheckbox({
  name,
  value,
  tPrefix,
  selectedFilterValues,
  onChange,
}: FilterCheckboxProps) {
  const { t } = useTranslation();

  return (
    <Checkbox
      id={value}
      name={name}
      label={t(`${tPrefix}${value}`)}
      checked={selectedFilterValues.includes(value)}
      onChange={onChange}
      value={value}
    />
  );
}

export default FilterCheckbox;

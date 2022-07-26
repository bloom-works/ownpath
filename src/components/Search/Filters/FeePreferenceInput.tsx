import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../utils/analytics";
import { FeePreference, SearchFilters } from "../../../types";
import { toggleItemInList } from "../../../utils";
import FilterCheckbox from "./FilterCheckbox";

type FeePreferenceInputProps = {
  legend: string;
  compact?: boolean;
  options: FeePreference[];
  optionLabelPrefix: string;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function FeePreferenceInput({
  legend,
  compact = false,
  options,
  optionLabelPrefix,
  filters,
  setFilters,
}: FeePreferenceInputProps) {
  const { t } = useTranslation();

  const setFeePreferenceFilter = (feePreference: FeePreference) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "payment options",
      filter_type: "payment options",
      filter_value: feePreference,
    });

    setFilters({
      ...filters,
      feePreferences: toggleItemInList(filters.feePreferences, feePreference),
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={compact ? "srOnly" : "large"}>
      {options.map((option) => (
        <FilterCheckbox
          name="payment options"
          value={option}
          label={t(`${optionLabelPrefix}${option}`)}
          selectedFilterValues={filters.feePreferences}
          onChange={() => {
            setFeePreferenceFilter(option);
          }}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default FeePreferenceInput;
